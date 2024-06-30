const db = require("../db");

exports.user = async (req, res, next) => {
  return await db.pool.query(
    'SELECT * FROM public."ListProduct"',
    (err, response) => {
      if (res.statusCode === 200) {
        res.render("home.ejs", {
          pageTitle: "Admin Page",
          prod: response?.rows,
          admin: false,
          // New
          name: "test",
          // End New
          url: req.protocol + "://" + req.header.host,
          onPage: "list",
          navigationActive: {
            list: "list",
            cart: "cart",
            addProduct: "",
            editProduct: "",
            reportSelling: "",
          },
          urlNavigation: {
            list: "/user/list",
            cart: "/user/cart",
            addProduct: "",
            editProduct: "",
            reportSelling: "",
          },
        });
      }
    }
  );
};
