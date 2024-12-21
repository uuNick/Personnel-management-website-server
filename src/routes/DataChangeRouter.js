const express = require('express');
const router = express.Router();
const DataChangeController = require("../controllers/DataChangeController");

router.get("/", DataChangeController.getallDataChanges);

router.get("/pag", DataChangeController.getAllDataChangesWithPag);

router.get("/sorted", DataChangeController.getSortedDataChanges);

router.get("/search_by_date", DataChangeController.searchDataChangesByDate);

router.get("/search_by_date_and_sort", DataChangeController.searchByDateAndSortDataChanges);

router.get("/:data_change_id", DataChangeController.getDataChangeById);

router.post("/", DataChangeController.createDataChange);

router.delete("/:data_change_id", DataChangeController.deleteDataChange);



module.exports = router;