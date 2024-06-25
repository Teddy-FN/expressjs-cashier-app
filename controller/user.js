const db = require("../db");

exports.user = async (req, res, next) => {
  return await db.pool.query(
    'SELECT * FROM public."ListProduct"',
    (err, response) => {
      console.log("response =>", response?.rows);
      if (res.statusCode === 200) {
        res.render("admin/home.ejs", {
          pageTitle: "Admin Page",
          prod: response?.rows,
          admin: false,
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
