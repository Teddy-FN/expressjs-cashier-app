const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const authRoutes = require("./routes/login");

// Admin Routes
const adminRoutes = require("./routes/admin");

// Error Controller
const errorController = require("./controller/error");

const app = express();

// Set EJS
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

// Admin Routes Page
app.use("/admin", adminRoutes);

// Login Page
app.use(authRoutes);
// Error Page
app.use(errorController.error);

app.listen(5000);
