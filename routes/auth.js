const express = require("express");

const router = express.Router();

// Form Login
router.get("/", (req, res, next) => {
  res.render("login.ejs", {
    pageTitle: "Login",
    url: req.protocol + "://" + req.header.host,
  });
});

// Login Post
router.post("/login", (req, res, next) => {
  const { body } = req;

  if (body.username === "admin" && body.password === "123") {
    return res.redirect("/admin/list");
  } else {
    return res.redirect("/user/list");
  }
});

module.exports = router;
