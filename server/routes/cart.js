const express = require("express");

const router = express.Router();

// Controller
const cartController = require("../controller/cart");

// Add Cart
router.post("/add-cart", cartController.Addcart);

// Delete Cart
router.post("/delete-cart", cartController.deleteCart);

// Edit Cart
router.post("/edit-cart", cartController.editCart);

// Generate Invoice
router.post("/invoice", cartController.invoice);

module.exports = router;
