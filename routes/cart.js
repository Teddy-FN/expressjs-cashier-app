const express = require("express");

const router = express.Router();

// Controller
const cartController = require("../controller/cart");

router.post("/add-cart", cartController.Addcart);

module.exports = router;
