const Employee = require('../models/Employee');
const fs = require('node:fs');
const path = require('node:path');
const { Op } = require('sequelize');

class EmployeeService {

    async createEmployee(data) {
        return await Employee.create(data);
    }

    async getAllEmployees() {
        return await Employee.findAll();
    }

    async getAllEmployeesWithPag(limit, offset) {
        return await Employee.findAndCountAll({
            limit: limit,
            offset: offset,
        })
    }

    async getSortedEmployees(limit, offset, sortBy, order) {
        return await Employee.findAndCountAll({
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        });
    }

    async searchEmployees(limit, offset, search) {
        return await Employee.findAndCountAll({
            where: {
                [Op.or]: [
                    { fullname: { [Op.like]: `%${search}%` } },
                    { position: { [Op.like]: `%${search}%` } },
                ],
            },
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        })
    }

    async searchAndSortEmployees(limit, offset, search, sortBy, order){
        return await Employee.findAndCountAll({
            where: {
                [Op.or]: [
                    { fullname: { [Op.like]: `%${search}%` } },
                    { position: { [Op.like]: `%${search}%` } },
                ],
            },
            order: [[sortBy, order]],
            offset: offset,
            limit: limit,
        })
    }

    async getEmployeeById(employee_id) {
        return await Employee.findByPk(employee_id);
    }

    async updateEmployee(employee_id, data, image_name) {
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            throw new Error("Работник с указанным ID не найден");
        }

        const updatedEmployee = await Employee.update(
            {
                full_name: data.full_name,
                birth_date: data.birth_date,
                position: data.position,
                start_date: data.start_date,
                phone_number: data.phone_number,
                email: data.email,
                address: data.address,
                image_name: image_name
            },
            {
                where: { id: employee_id }
            }
        )
        return updatedEmployee;
    }

    deleteImage(file_name) {
        const imagePath = path.join(__dirname, '..', 'uploads', 'employees', file_name);

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log(`Фотография ${imagePath} успешно удалена.`);
        } else {
            console.log(`Фотография ${imagePath} не найдена.`);
        }
    }

    async deleteEmployee(employee_id) {
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            throw new Error("Работник с указанным ID не найден");
        }
        this.deleteImage(employee.image_name);
        await employee.destroy();
    }

    async updateImage(employee_id, image_name) {
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            throw new Error("Работник с указанным ID не найден");
        }

        const updatedEmployee = await Employee.update(
            {
                image_name: image_name
            },
            {
                where: { id: employee_id }
            }
        )
        return updatedEmployee;
    }
}

module.exports = new EmployeeService();