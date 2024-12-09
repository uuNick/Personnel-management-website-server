const express = require('express');
const router = express.Router();
const DayOffController = require("../controllers/DayOffController");

router.get("/", DayOffController.getallDaysOff);

router.get("/:day_off_id", DayOffController.getDayOffById);

router.post("/", DayOffController.createDayOff);

router.put("/:day_off_id", DayOffController.updateDayOff);

router.delete("/:day_off_id", DayOffController.deleteDayOff);



module.exports = router;