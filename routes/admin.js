const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();

// Import Admin Controller
const adminController = require("../controller/admin");
// Import Home Conctoller
const homeController = require("../controller/home");

// List Home Default
router.get("/list", homeController.home);

// Search
router.post("/list", homeController.home);

// List Home By Value
router.post("/filter/:value", homeController.filteringHome);

// Render Form Add Product
router.get("/add-product", adminController.renderFormAdd);

// Function Post Product
router.post(
  "/add-product",
  upload.single("image"),
  adminController.postAddProduct
);

// Function Delete
router.post("/delete-product", adminController.deleteProduct);

// Render Form Edit Product
router.get("/edit-product/:id", adminController.renderFormEdit);

// Router delete Image
router.post("/delete-image", adminController.deleteImage);

// Router Render Category
router.get("/add-category", adminController.renderAddCategory);

// Function Post new Category
router.post("/add-category", adminController.postAddCategory);

// Function Post Edit Product
router.post(
  "/edit-product/:id",
  upload.single("image"),
  adminController.EditProduct
);

// Function Render Cart
router.get("/cart", adminController.renderCart);

module.exports = router;
