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

const upload = multer({ storage: storage });

const router = express.Router();

// Import Admin Controller
const adminController = require("../controller/admin");

// List Home
router.get("/list", adminController.home);

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

// Function Post Edit Product
router.post(
  "/edit-product/:id",
  upload.single("image"),
  adminController.EditProduct
);

// Function Show Graph
router.get("/report-selling", adminController.showGraph);

// Function Filter Graph
router.post("/filter-chart", adminController.filterGraph);

// Function Render Cart
router.get("/cart", adminController.renderCart);

module.exports = router;
