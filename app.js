const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const adminRoutes = require("./routes/admin");

// Error Controller
const errorController = require("./controller/error");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Login Page
app.use("/", (req, res, next) => {
  res.render("login.ejs");
});

// Admin Routes Page
app.use("/admin", adminRoutes);

// Error Page
app.use(errorController.error);

app.listen(5000);
