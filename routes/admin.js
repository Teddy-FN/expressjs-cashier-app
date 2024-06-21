const express = require("express");

const router = express.Router();

// Import Admin Controller
const adminController = require("../controller/admin");

router.get("/list", adminController.home);

// Render Form Add Product
router.get("/add-product", adminController.renderFormAdd);

// Function Post Product
router.post("/add-product", adminController.postAddProduct);

// Function Delete
router.post("/delete-product", adminController.deleteProduct);

// Render Form Edit Product
router.get("/edit-product/:id", adminController.renderFormEdit);

// Function Post Edit Product
router.post("/edit-product/:id", adminController.EditProduct);

module.exports = router;
