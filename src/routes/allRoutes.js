const express = require("express");
const router = express.Router();

//const AuthRouter = require("./AuthRouter");
const DataChangeRouter = require("./DataChangeRouter");
const DayOffRouter = require("./DayOffRouter");
const DocumentRouter = require("./DocumentRouter");
const EmployeeRouter = require("./EmployeeRouter");
const SickLeaveRouter = require("./SickLeaveRouter");
const VacationRouter = require("./VacationRouter");
const ExcelRouter = require('./ExcelRouter');
const WordRouter = require('./WordRouter');
const PDFRouter = require('./PDFRouter');

//router.use("/auth", AuthRouter);
router.use("/dataChanges", DataChangeRouter);
router.use("/daysOff", DayOffRouter);
router.use("/documents", DocumentRouter);
router.use("/employees", EmployeeRouter);
router.use("/sickLeaves", SickLeaveRouter);
router.use("/vacations", VacationRouter);
router.use("/excel", ExcelRouter);
router.use("/word", WordRouter);
router.use("/pdf", PDFRouter);
module.exports = router;