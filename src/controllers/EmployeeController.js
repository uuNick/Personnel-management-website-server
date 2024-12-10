const EmployeeService = require("../services/EmployeeService");

class EmployeeController {

    async createEmployee(req, res) {
        const { fullname, birth_date, position, start_date, phone_number, email, address } = req.body;
        const image_name = req.file ? `${req.file.filename}` : null;

        try {
            const employee = await EmployeeService.createEmployee({ fullname, birth_date, position, start_date, phone_number, email, address, image_name });
            return res.status(201).json(employee);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAllEmployees(req, res) {
        try {
            const employees = await EmployeeService.getAllEmployees();
            const employeesWithUrls = employees.map(employee => ({
                fullname: employee.fullname,
                birth_date: employee.birth_date,
                position: employee.position,
                start_date: employee.start_date,
                phone_number: employee.phone_number,
                email: employee.email,
                address: employee.address,
                imageUrl: employee.image_name ? `/employees/${employee.image_name}` : null
            }));
            return res.status(200).json(employeesWithUrls);
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
            const employeeWithUrl = {
                fullname: employee.fullname,
                birth_date: employee.birth_date,
                position: employee.position,
                start_date: employee.start_date,
                phone_number: employee.phone_number,
                email: employee.email,
                address: employee.address,
                imageUrl: employee.image_name ? `/employees/${employee.image_name}` : null
            };
            return res.status(200).json(employeeWithUrl);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateEmployee(req, res) {
        const { employee_id } = req.params;
        const { data } = req.body;
        const image_name = req.file ? `${req.file.filename}` : null;
        try {
            const updatedEmployee = await EmployeeService.updateEmployee(employee_id, data, image_name);
            if (!updatedEmployee) {
                return res.status(404).json({ message: "Работник не найден" });
            }
            return res.status(200).json(updatedEmployee);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateImage(req, res) {
        const { employee_id } = req.params;
        const image_name = req.file ? `${req.file.filename}` : null;
        try {
            const updatedEmployee = await EmployeeService.updateImage(employee_id, image_name);
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