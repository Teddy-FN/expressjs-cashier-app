const express = require("express");

const router = express.Router();

// Controller
const cartController = require("../controller/cart");

// Add Cart
router.post("/add-cart", cartController.Addcart);

// Generate Invoice
router.post("/invoice:/id", cartController.invoice);

module.exports = router;
