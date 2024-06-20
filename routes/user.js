const express = require("express");

const router = express.Router();

// Import Controller User
const userController = require("../controller/user");

router.use("/list", userController.user);

module.exports = router;
