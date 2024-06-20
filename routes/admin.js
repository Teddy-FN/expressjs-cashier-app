const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");

router.get("/", adminController.home);

module.exports = router;
