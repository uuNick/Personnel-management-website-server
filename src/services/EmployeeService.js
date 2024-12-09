const Employee = require('../models/Employee');

class EmployeeService {

    async createEmployee(data) {
        return await Employee.create(data);
    }

    async getAllEmployees() {
        return await Employee.findAll();
    }

    async getEmployeeById(employee_id) {
        return await Employee.findByPk(employee_id);
    }

    async updateEmployee(employee_id, data) {
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            throw new Error("Работник с указанным ID не найден");
        }

        const updatedEmployee = await Employee.update(
            {
                full_name: data.full_name,
                birth_date: data.birth_date,
                position: data.position,
                //start_date: data.start_date,
                phone_number: data.phone_number,
                email: data.email,
                address: data.address,
                image_name: data.image_name
            },
            {
                where: { id: employee_id }
            }
        )
        return updatedEmployee;
    }

    async deleteEmployee(employee_id) {
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            throw new Error("Работник с указанным ID не найден");
        }
        await employee.destroy();
    }
}

module.exports = new EmployeeService();