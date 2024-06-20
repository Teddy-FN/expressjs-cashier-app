const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const adminRoutes = require("./routes/admin");

// Error Controller
const errorController = require("./controller/error");

// Error Page
app.use(adminRoutes);
app.use(errorController.error);

app.listen(5000);
