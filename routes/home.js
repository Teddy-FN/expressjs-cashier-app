const express = require("express");

const router = express.Router();

// Controller
const cartController = require("../controller/cart");

// Get Filtering List
router.get("/add-cart", cartController.Addcart);

module.exports = router;
