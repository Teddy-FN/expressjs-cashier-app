const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = 5000;

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");

// Error Controller
const errorController = require("./controller/error");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static("assets"));

// Admin Routes Page
app.use("/admin", adminRoutes);

// User Routes Page
app.use("/user", userRoutes);

// Cart Routes
app.use("/cart", cartRoutes);

// Login Page
app.use(authRoutes);

// Error Page
app.use(errorController.error);

app.listen(port);
