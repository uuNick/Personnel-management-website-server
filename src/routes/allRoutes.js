const express = require("express");
const router = express.Router();

//const AuthRouter = require("./AuthRouter");
const DataChangeRouter = require("./DataChangeRouter");
const DayOffRouter = require("./DayOffRouter");
const DocumentRouter = require("./DocumentRouter");
const EmployeeRouter = require("./EmployeeRouter");
const SickLeaveRouter = require("./SickLeaveRouter");
const VacationRouter = require("./VacationRouter");

//router.use("/auth", AuthRouter);
router.use("/dataChanges", DataChangeRouter);
router.use("/daysOff", DayOffRouter);
router.use("/documents", DocumentRouter);
router.use("/employees", EmployeeRouter);
router.use("/sickLeaves", SickLeaveRouter);
router.use("/Vacations", VacationRouter);

module.exports = router;