const db = require("../db");
const moment = require("moment");
const invoiceDate = new Date();

exports.home = async (req, res, next) => {
  const allCokies = req.headers.cookie.split("; ");
  const getUserId = allCokies
    ?.filter((items) => items.includes("id="))?.[0]
    ?.replace("id=", "");
  const role = allCokies
    ?.filter((items) => items.includes("role="))?.[0]
    ?.replace("role=", "");
  const getUserName = allCokies
    ?.filter((items) => items.includes("userName"))?.[0]
    ?.replace("userName=", "");

  return db.pool.query(
    // Query Get All Product
    'SELECT * FROM public."ListProduct"',
    (err, responseProd) => {
      return db.pool.query(
        // Query Get Product Checkout
        'SELECT * FROM public."Cart" WHERE "userId" = $1 AND "userName" = $2',
        [Number(getUserId), getUserName],
        (err, responseCart) => {
          return db.pool.query(
            // Query Get Product Checkout By Id
            'SELECT * FROM public."Cart" WHERE "userId" = $1 AND "userName" = $2',
            [Number(getUserId), getUserName],
            async (err, responseCheckout) => {
              console.log("responseCheckout =>", responseCheckout);
              return db.pool.query(
                // Query Get Filter By Category
                'SELECT * FROM public."Filtering"',
                (err, responseFiltering) => {
                  let totalInvoice = 0;
                  let newProduct = [];
                  let newResponseCart = [];

                  responseProd?.rows?.forEach((items) => {
                    newProduct.push({
                      ...items,
                      price: new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(Number(items.price))
                        .toString()
                        .replace(",00", ""),
                    });
                  });

                  responseCart?.rows?.forEach((items) => {
                    newResponseCart.push({
                      ...items,
                      price: new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(Number(items.price))
                        .toString()
                        .replace(",00", ""),
                      totalPrice: new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(Number(items.totalPrice))
                        .toString()
                        .replace(",00", ""),
                    });
                  });

                  if (responseCheckout.rows) {
                    responseCheckout?.rows?.forEach((prod) => {
                      totalInvoice += Number(prod.totalPrice);
                    });
                  }

                  console.log("prod.totalPrice =>", totalInvoice);

                  if (res.statusCode === 200) {
                    res.render("home.ejs", {
                      pageTitle: role === "user" ? "User Page" : "Admin Page",
                      prod: newProduct,
                      cart: newResponseCart,
                      admin: role === "user" ? false : true,
                      url: req.protocol + "://" + req.header.host,

                      // Filtering
                      filter: responseFiltering?.rows,
                      // End Filtering

                      // New
                      name: "test",
                      // End New

                      // Cart
                      checkout: responseCheckout?.rows || [],
                      // End Cart
                      invoiceDate: moment(invoiceDate).format("DD/MM/YYYY"),
                      // Total Invoice
                      totalInvoice: totalInvoice,

                      onPage: "list",
                      navigationActive: {
                        list: "list",
                        cart: "cart",
                        addProduct: "add-product",
                        editProduct: "edit-product",
                        reportSelling: "report-selling",
                      },
                      urlNavigation: {
                        list: "/admin/list",
                        cart: "/admin/cart",
                        addProduct: "/admin/add-product",
                        editProduct: "/admin/edit-product",
                        reportSelling: "/admin/report-selling",
                      },
                    });
                  }
                }
              );
            }
          );
        }
      );
    }
  );
};

// When User Filter
exports.filteringHome = (req, res, next) => {
  const { filtering } = req.body;
  const allCokies = req.headers.cookie.split("; ");
  const getUserId = allCokies
    ?.filter((items) => items.includes("id="))?.[0]
    ?.replace("id=", "");
  const role = allCokies
    ?.filter((items) => items.includes("role="))?.[0]
    ?.replace("role=", "");
  const getUserName = allCokies
    ?.filter((items) => items.includes("userName"))?.[0]
    ?.replace("userName=", "");

  const query =
    filtering === "lihat semua"
      ? 'SELECT * FROM public."ListProduct"'
      : 'SELECT * FROM public."ListProduct" WHERE (category = $1)';
  if (filtering !== "lihat semua") {
    return db.pool.query(
      // Query Get All Product
      query,
      filtering === "lihat semua" ? [] : [filtering],
      (err, responseProd) => {
        return db.pool.query(
          // Query Get Product Checkout
          'SELECT * FROM public."Cart" WHERE "userId" = $1 AND "userName" = $2',
          [Number(getUserId), getUserName],
          (err, responseCart) => {
            return db.pool.query(
              // Query Get Product Checkout By Id
              'SELECT * FROM public."Cart" WHERE "userId" = $1 AND "userName" = $2',
              [Number(getUserId), getUserName],
              async (err, responseCheckout) => {
                return db.pool.query(
                  // Query Get Filter By Category
                  'SELECT * FROM public."Filtering"',
                  (err, responseFiltering) => {
                    let totalInvoice = 0;
                    let newProduct = [];
                    let newResponseCart = [];

                    responseProd?.rows?.forEach((items) => {
                      newProduct.push({
                        ...items,
                        price: new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                          .format(Number(items.price))
                          .toString()
                          .replace(",00", ""),
                      });
                    });

                    responseCart?.rows?.forEach((items) => {
                      newResponseCart.push({
                        ...items,
                        price: new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                          .format(Number(items.price))
                          .toString()
                          .replace(",00", ""),
                        totalPrice: new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                          .format(Number(items.totalPrice))
                          .toString()
                          .replace(",00", ""),
                      });
                    });

                    if (responseCheckout.rows) {
                      responseCheckout?.rows?.forEach((prod) => {
                        totalInvoice += Number(prod.totalPrice);
                      });
                    }

                    if (res.statusCode === 200) {
                      res.render("home.ejs", {
                        pageTitle: role === "user" ? "User Page" : "Admin Page",
                        prod: newProduct,
                        cart: newResponseCart,
                        admin: role === "user" ? false : true,
                        url: req.protocol + "://" + req.header.host,

                        // Filtering
                        filter: responseFiltering?.rows || [],
                        // End Filtering

                        // New
                        name: "test",
                        // End New

                        // Cart
                        checkout: responseCheckout?.rows || [],
                        // End Cart
                        invoiceDate: moment(invoiceDate).format("DD/MM/YYYY"),
                        // Total Invoice
                        totalInvoice: totalInvoice,

                        onPage: "list",
                        navigationActive: {
                          list: "list",
                          cart: "cart",
                          addProduct: "add-product",
                          editProduct: "edit-product",
                          reportSelling: "report-selling",
                        },
                        urlNavigation: {
                          list: "/admin/list",
                          cart: "/admin/cart",
                          addProduct: "/admin/add-product",
                          editProduct: "/admin/edit-product",
                          reportSelling: "/admin/report-selling",
                        },
                      });
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  } else {
    res.redirect("/admin/list");
  }
};
