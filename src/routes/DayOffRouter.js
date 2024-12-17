const express = require('express');
const router = express.Router();
const DayOffController = require("../controllers/DayOffController");

router.get("/", DayOffController.getallDaysOff);

router.get("/pag", DayOffController.getAllDaysOffWithPag);

router.get("/sorted", DayOffController.getSortedDaysOff);

router.get("/search_by_dates", DayOffController.searchDaysOffByDates);

router.get("/search_by_emp_id", DayOffController.searchDaysOffByEmployeeId);

router.get("/search_by_date_and_sort", DayOffController.searchByDateAndSortDaysOff);

router.get("/:day_off_id", DayOffController.getDayOffById);

router.post("/", DayOffController.createDayOff);

router.put("/:day_off_id", DayOffController.updateDayOff);

router.delete("/:day_off_id", DayOffController.deleteDayOff);



module.exports = router;