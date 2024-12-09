const express = require('express');
const router = express.Router();
const SickLeaveController = require("../controllers/SickLeaveController");

router.get("/", SickLeaveController.getAllSickLeaves);

router.get("/:sick_leave_id", SickLeaveController.getSickLeaveById);

router.post("/", SickLeaveController.createSickLeave);

router.put("/:sick_leave_id", SickLeaveController.updateSickLeave);

router.delete("/:sick_leave_id", SickLeaveController.deleteSickLeave);

module.exports = router;