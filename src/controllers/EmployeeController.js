const EmployeeService = require("../services/EmployeeService");

class EmployeeController {

    async createEmployee(req, res) {
        const { full_name, birth_date, position, start_date, phone_number, email, address, image_name } = req.body;

        try {
            const employee = await EmployeeService.createEmployee({ full_name, birth_date, position, start_date, phone_number, email, address, image_name });
            return res.status(201).json(employee);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllEmployees(req, res) {
        try {
            const employees = await EmployeeService.getAllEmployees();
            return res.status(200).json(employees);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getEmployeeById(req, res) {
        const { employee_id } = req.params;
        try {
            const employee = await EmployeeService.getEmployeeById(employee_id);
            if (!employee) {
                return res.status(404).json({ message: "Работник не найден" });
            }
            return res.status(200).json(employee);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateEmployee(req, res) {
        const { employee_id } = req.params;
        const { data } = req.body;
        try {
            const updatedEmployee = await EmployeeService.updateEmployee(employee_id, data);
            if (!updatedEmployee) {
                return res.status(404).json({ message: "Работник не найден" });
            }
            return res.status(200).json(updatedEmployee);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteEmployee(req, res) {
        const { employee_id } = req.params;
        try {
            await EmployeeService.deleteEmployee(employee_id);
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new EmployeeController();