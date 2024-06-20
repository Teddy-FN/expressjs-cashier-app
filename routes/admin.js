const express = require("express");

const router = express.Router();

// Import Admin Controller
const adminController = require("../controller/admin");

router.get("/list", adminController.home);

module.exports = router;
