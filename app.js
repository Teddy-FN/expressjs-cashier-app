const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const authRoutes = require("./routes/auth");

// Admin Routes
const adminRoutes = require("./routes/admin");

// User Routes
const userRoutes = require("./routes/user");

// Error Controller
const errorController = require("./controller/error");

const app = express();

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

// Admin Routes Page
app.use("/admin", adminRoutes);

// User routes Page
app.use("/user", userRoutes);

// Login Page
app.use(authRoutes);

// Error Page
app.use(errorController.error);

app.listen(5000);
