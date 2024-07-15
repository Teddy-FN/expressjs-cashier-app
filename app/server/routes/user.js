const express = require("express");

const router = express.Router();

// Import Home Controller
const homeController = require("../controller/home");

router.use("/list", homeController.home);

// Search
router.post("/list", homeController.home);

// List Home By Value
router.post("/filter/:value", homeController.filteringHome);

module.exports = router;
