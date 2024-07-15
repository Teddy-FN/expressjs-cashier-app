const express = require("express");

const router = express.Router();

const reportSellingController = require("../controller/reportSelling");

// Function Show Graph
router.get("/show-graph", reportSellingController.showGraph);

// Function Filter Graph
router.post("/show-graph", reportSellingController.showGraph);

module.exports = router;
