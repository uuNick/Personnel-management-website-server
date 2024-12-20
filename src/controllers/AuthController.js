require('dotenv').config();
const { Role, User } = require("../models/Models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10h" });
}

class authController {
    async registration(req, res) {
        try {
            const { email, username, password } = req.body;
            
            let candidate;

            candidate = await User.findOne({
                where: { email: email },
            })

            if (candidate) {
                return res.status(409).json({ message: "Адрес электронной почты занят" });
            }

            candidate = null;
            
            candidate = await User.findOne({
                where: { username: username },
            })

            if (candidate) {
                return res.status(409).json({ message: "Пользователь с таким именем уже существует" });
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const userRole = await Role.findOne({
                where: { roleName: "ИНСПЕКТОР" }
            })

            const newUser = await User.create({
                email: email,
                username: username,
                password: hashPassword,
            });

            await newUser.addRole(userRole);
            return res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Ошибка регистрации" })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({
                where: { username: username }
            })

            if (!user) {
                return res.status(404).json({ message: `Пользователь ${username} не найден` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(401).json({ message: `Введен неверный пароль` });
            }

            const userWithRoles = await User.findOne({
                where: { id: user.id },
                include: [{
                    model: Role,
                    through: { attributes: [] }
                }]
            });

            const roleNames = userWithRoles.Roles.map(role => role.roleName);

            const token = generateAccessToken(user.id, roleNames)

            return res.status(200).json({ token, roleNames });

        } catch (e) {
            console.log(e);
            res.status(500).json({ message: "Ошибка авторизации" })
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll()
            return res.status(200).json(users)
        } catch (e) {
            return res.status(500).json({message: `Ошибка при получении всех пользователей системы: ${e}`});
        }
    }

    async resetPasswwordRequest(req, res) {
        const { email } = req.body;

        try {

            const user = await User.findOne({
                where: { email: email }
            })

            if (!user) {
                return res.status(404).json({ message: "Email не зарегистрированн" });
            }

            const id = user.id

            const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
            const resetPasswordLink = `${process.env.DOMAIN}/resetPassword?token=${token}`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                }
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Сброс пароля',
                html: `<p>Для сброса пароля перейдите по <a href="${resetPasswordLink}">ссылке</a>.</p>`
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: 'Письмо с восстанавливающей ссылкой отправлено' });

        } catch (error) {
            console.error('Ошибка при сбросе пароля:', error);
            res.status(500).json({ error: `Произошла ошибка: ${error}` });
        }
    }

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (!decoded || !decoded.id) {
                return res.status(401).json({ error: 'Неверный или просроченный токен' });
            }

            const user_id = decoded.id;

            const user = await User.findByPk(user_id);
            if (!user) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }

            const hashedPassword = bcrypt.hashSync(newPassword, 7);
            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({ message: "Пароль успешно изменен" })

        } catch (error) {
            console.error('Ошибка при сбросе пароля:', error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Токен просрочен' });
            }
            return res.status(500).json({ error: `Произошла ошибка ${error}` });
        }
    }
}

module.exports = new authController()