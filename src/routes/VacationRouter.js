const express = require('express');
const router = express.Router();
const VacationController = require("../controllers/VacationController");

router.get("/", VacationController.getAllVacations);

router.get("/pag", VacationController.getAllVacationsWithPag);

router.get("/sorted", VacationController.getSortedVacations);

router.get("/search_by_dates", VacationController.searchVacationsByDates);

router.get("/search_by_emp_id", VacationController.searchVacationsByEmployeeId);

router.get("/:vacation_id", VacationController.getVacationById);

router.post("/", VacationController.createVacation);

router.put("/:vacation_id", VacationController.updateVacation);

router.delete("/:vacation_id", VacationController.deleteVacation);

module.exports = router;