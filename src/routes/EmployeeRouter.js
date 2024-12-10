const express = require('express');
const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController");
const upload = require('../multerConfig');

router.get("/", EmployeeController.getAllEmployees);

router.get("/:employee_id", EmployeeController.getEmployeeById);

router.post("/", upload.single('image'), EmployeeController.createEmployee);

router.put("/:employee_id", upload.single('image'), EmployeeController.updateEmployee);

router.delete("/:employee_id", EmployeeController.deleteEmployee);



module.exports = router;