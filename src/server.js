require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require("./db");
const models = require("./models/Models");
const router = require("./routes/allRoutes");
const { EmployeeSeed, DocumentSeed, SickLeaveSeed, VacationSeed, DayOffSeed, UserSeed, RoleSeed, UserRoleSeed } = require("./seed");

const port = process.env.SERVER_PORT;
const app = express()

const corsOptions = {
    origin: process.env.DOMAIN,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('uploads'));
app.use("/api", router);

async function seedDatabase() {
    try {
        await new EmployeeSeed().seed();
        await new DocumentSeed().seed();
        await new SickLeaveSeed().seed();
        await new VacationSeed().seed();
        await new DayOffSeed().seed();
        await new UserSeed().seed();
        await new RoleSeed().seed();
        await new UserRoleSeed().seed();
        console.log('Все таблицы успешно заполнены!');
    } catch (error) {
        console.error('Ошибка при заполнении базы данных:', error);
        process.exit(1);
    }
}

async function syncModels() {
    try {
        await models.User.sync();
        await models.Role.sync();
        await models.UserRole.sync();
        await models.Employee.sync();
        await models.Document.sync();
        await models.DataChange.sync();
        await models.DayOff.sync();
        await models.Vacation.sync();
        await models.SickLeave.sync();
        console.log('Модели успешно синхронизированы!');
    } catch (error) {
        console.error('Ошибка синхронизации моделей:', error);
        process.exit(1);
    }
}

const start = async () => {
    try {
        await sequelize.authenticate();
        await syncModels();
        await seedDatabase();
        app.listen(port, () => console.log(`Server listening on port ${port}`));
    } catch (e) {
        console.log(e);
    }
};

start();