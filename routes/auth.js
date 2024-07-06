const express = require("express");

const router = express.Router();

// Contollers
const authController = require("../controller/auth");

// Form Login
router.get("/", authController.renderFormLogin);

// Login Post
router.post("/login", authController.login);

// Login With Error
router.post("/login", (req, res, next) => {
  res.render("login.ejs", {
    pageTitle: "Login",
    url: req.protocol + "://" + req.header.host,
    error: "Username / Password tidak sesuai",
  });
});

// Render Register Account
router.get("/register", (req, res, next) => {
  res.render("register.ejs", {
    pageTitle: "Register New Account",
    url: req.protocol + "://" + req.header.host,
    error: "",
    success: false,
  });
});

// Function Post New Account
router.post("/register", authController.registerNewUser);

// Logout
router.post("/logout", authController.logout);

module.exports = router;
