const express = require("express");

const router = express.Router();

// Import Home Controller
const homeController = require("../controller/home");

router.use("/list", homeController.home);

module.exports = router;
