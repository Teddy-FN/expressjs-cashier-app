const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const { credentials } = require("./config");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");
const reportSellingRoutes = require("./routes/reportSelling");

// Error Controller
const errorController = require("./controller/error");

const app = express();
app.use(cookieParser(credentials.secretCookie));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static("assets"));

// Admin Routes Page
app.use("/admin", adminRoutes);

// User Routes Page
app.use("/user", userRoutes);

// Cart Routes
app.use("/cart", cartRoutes);

// Report Selling Routes
app.use("/report-selling", reportSellingRoutes);

// Login Page
app.use(authRoutes);

// Error Page
app.use(errorController.error);

app.listen(process.env.POSTGRES_PORT || 5000, () => {
  console.log("server running port 5000");
});
