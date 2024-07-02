const express = require("express");

const router = express.Router();

// Import Controller User
// const userController = require("../controller/user");

// Import Home Controller
const homeController = require("../controller/home");

router.use("/list", homeController.home);

module.exports = router;
