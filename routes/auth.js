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
    error: "Error Invalid User",
  });
});

// Logout
router.post("/logout", authController.logout);

module.exports = router;
