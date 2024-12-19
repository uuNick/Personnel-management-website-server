const express = require('express');
const router = express.Router();
const SickLeaveController = require("../controllers/SickLeaveController");

router.get("/", SickLeaveController.getAllSickLeaves);

router.get("/pag", SickLeaveController.getAllSickLeavesWithPag);

router.get("/sorted", SickLeaveController.getSortedSickLeaves);

router.get("/search_by_dates", SickLeaveController.searchSickLeavesByDates);

router.get("/search_by_emp_id", SickLeaveController.searchSickLeavesByEmployeeId);

router.get("/search_all_by_emp_id", SickLeaveController.searchAllSickLeavesByEmployeeId);

router.get("/search_by_date_and_sort", SickLeaveController.searchByDateAndSortSickLeaves);

router.get("/:sick_leave_id", SickLeaveController.getSickLeaveById);

router.post("/", SickLeaveController.createSickLeave);

router.put("/:sick_leave_id", SickLeaveController.updateSickLeave);

router.delete("/:sick_leave_id", SickLeaveController.deleteSickLeave);

module.exports = router;