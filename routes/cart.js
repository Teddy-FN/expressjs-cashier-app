const express = require("express");

const router = express.Router();

// Controller
const cartController = require("../controller/cart");

// Add Cart
router.post("/add-cart", cartController.Addcart);

// Delete Cart
router.post("/delete-cart/:id/:userId/:userName", cartController.deleteCart);

// Generate Invoice
router.post("/invoice:/id/:userId/:userName", cartController.invoice);

module.exports = router;
