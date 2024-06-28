const express = require("express");

const router = express.Router();

// Contollers
const authController = require("../controller/auth");

// Form Login
router.get("/", (req, res, next) => {
  res.render("login.ejs", {
    pageTitle: "Login",
    url: req.protocol + "://" + req.header.host,
    error: "",
  });
});

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
router.post("/logout", (req, res, next) => {
  console.log("req.body =>", req.body);
  localStorage.removeItem("userName");
  localStorage.removeItem("id");
  localStorage.removeItem("password");
  localStorage.removeItem("role");
  return res.redirect("/");
});

module.exports = router;
