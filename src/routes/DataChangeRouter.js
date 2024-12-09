const express = require('express');
const router = express.Router();
const DataChangeController = require("../controllers/DataChangeController");

router.get("/", DataChangeController.getallDataChanges);

router.get("/:data_change_id", DataChangeController.getDataChangeById);

router.post("/", DataChangeController.createDataChange);

router.delete("/:data_change_id", DataChangeController.deleteDataChange);



module.exports = router;