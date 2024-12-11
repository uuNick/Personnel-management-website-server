const express = require('express');
const router = express.Router();
const EmployeeController = require("../controllers/EmployeeController");
const upload = require('../multerConfig');

router.get("/", EmployeeController.getAllEmployees);

router.get("/pag", EmployeeController.getAllEmployeesWithPag);

router.get("/sorted", EmployeeController.getSortedEmployees);

router.get("/search", EmployeeController.searchEmployees);

router.get("/search_and_sort", EmployeeController.searchAndSortEmployees);

router.get("/:employee_id", EmployeeController.getEmployeeById);

router.post("/", upload.single('image'), EmployeeController.createEmployee);

router.put("/:employee_id", upload.single('image'), EmployeeController.updateEmployee);

router.delete("/:employee_id", EmployeeController.deleteEmployee);

router.patch("/:employee_id", upload.single('image'), EmployeeController.updateImage);


module.exports = router;