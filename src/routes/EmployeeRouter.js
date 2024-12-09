const express = require('express');
const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController");

router.get("/", EmployeeController.getAllEmployees);

router.get("/:employee_id", EmployeeController.getEmployeeById);

router.post("/", EmployeeController.createEmployee);

router.put("/:employee_id", EmployeeController.updateEmployee);

router.delete("/:employee_id", EmployeeController.deleteEmployee);



module.exports = router;