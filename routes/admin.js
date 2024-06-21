const express = require("express");

const router = express.Router();

// Import Admin Controller
const adminController = require("../controller/admin");

router.get("/list", adminController.home);

// Render Form
router.get("/add-product", adminController.renderFormAdd);

// Function Post Product
router.post("/add-product", adminController.postAddProduct);

// Function Delete
router.post("/delete-product", adminController.deleteProduct);

module.exports = router;
