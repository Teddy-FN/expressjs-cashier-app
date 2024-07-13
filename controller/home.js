const db = require("../db");
const moment = require("moment");
const invoiceDate = new Date();

exports.home = async (req, res, next) => {
  const { search = "" } = req.body;
  console.log("SEARCH =>", search);
  const allCokies = req?.headers?.cookie?.split("; ") || [];
  const getUserId = allCokies
    ?.filter((items) => items.includes("id="))?.[0]
    ?.replace("id=", "");
  const role = allCokies
    ?.filter((items) => items.includes("role="))?.[0]
    ?.replace("role=", "");
  const getUserName = allCokies
    ?.filter((items) => items.includes("userName"))?.[0]
    ?.replace("userName=", "");

  const querySearch = !search
    ? 'SELECT * FROM public."ListProduct"'
    : `SELECT * FROM public."ListProduct" WHERE LOWER("productName") LIKE '%${search}%'`;

  // Data User
  const user = {
    userId: getUserId,
    role: role,
    userData: getUserName,
  };

  return db.pool.query(
    // Query Get All Product
    querySearch,
    [],
    (err, responseProd) => {
      console.log("ERR", err);
      console.log("responseProd =>", responseProd);
      return db.pool.query(
        // Query Get Product Checkout
        'SELECT * FROM public."Cart" WHERE "userId" = $1 AND "userName" = $2',
        [Number(getUserId), getUserName],
        (err, responseCart) => {
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

              if (responseCart?.rows) {
                responseCart?.rows?.forEach((prod) => {
                  totalInvoice += Number(prod.totalPrice);
                });
              }

              if (res.statusCode === 200) {
                res.render("home.ejs", {
                  pageTitle: role === "user" ? "User Page" : "Admin Page",

                  emptyProduct: newProduct.length < 1,
                  prod: newProduct,

                  cartEmpty: newResponseCart.length < 1,
                  cart: newResponseCart,

                  admin: role === "user" ? false : true,
                  url: req.protocol + "://" + req.header.host,

                  filteringCategory: "lihat semua",

                  emptyFilter: responseFiltering?.rows?.length < 1,

                  // Filtering
                  filter: responseFiltering?.rows,

                  // Cart
                  checkout: responseCart?.rows || [],

                  // End Cart
                  invoiceDate: moment(invoiceDate).format("DD/MM/YYYY"),

                  // Total Invoice
                  totalInvoice: totalInvoice
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(Number(totalInvoice))
                        .toString()
                        .replace(",00", "")
                    : "Rp. 0",

                  // Auth Login
                  auth: JSON.stringify(user),

                  // Invoice
                  invoiceProduct: JSON.stringify(responseCart?.rows),

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
                    reportSelling: "/report-selling/show-graph",
                  },
                });
              }
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
  const allCokies = req?.headers?.cookie?.split("; ") || [];
  const getUserId = allCokies
    ?.filter((items) => items.includes("id="))?.[0]
    ?.replace("id=", "");
  const role = allCokies
    ?.filter((items) => items.includes("role="))?.[0]
    ?.replace("role=", "");
  const getUserName = allCokies
    ?.filter((items) => items.includes("userName"))?.[0]
    ?.replace("userName=", "");

  // Data User
  const user = {
    userId: getUserId,
    role: role,
    userData: getUserName,
  };

  const query =
    filtering === "lihat semua"
      ? 'SELECT * FROM public."ListProduct"'
      : 'SELECT * FROM public."ListProduct" WHERE("category" = $1)';
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

                if (responseCart?.rows) {
                  responseCart?.rows?.forEach((prod) => {
                    totalInvoice += Number(prod.totalPrice);
                  });
                }

                if (res.statusCode === 200) {
                  res.render("home.ejs", {
                    pageTitle: role === "user" ? "User Page" : "Admin Page",
                    emptyProduct: newProduct.length < 1,
                    prod: newProduct,

                    cartEmpty: newResponseCart.length < 1,
                    cart: newResponseCart,

                    admin: role === "user" ? false : true,
                    url: req.protocol + "://" + req.header.host,

                    emptyFilter: responseFiltering?.rows?.length < 1,

                    filteringCategory: filtering,

                    // Filtering
                    filter: responseFiltering?.rows || [],

                    // Cart
                    checkout: responseCart?.rows || [],
                    // End Cart
                    invoiceDate: moment(invoiceDate).format("DD/MM/YYYY"),

                    // Total Invoice
                    totalInvoice: totalInvoice
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })
                          .format(Number(totalInvoice))
                          .toString()
                          .replace(",00", "")
                      : "Rp. 0",

                    invoiceProduct: JSON.stringify(responseCart?.rows),

                    // Auth Login
                    auth: user,

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
                      reportSelling: "/report-selling/show-graph",
                    },
                  });
                }
              }
            );
          }
        );
      }
    );
  } else {
    const roleLogin = role === "admin" ? "admin" : "user";
    res.redirect(`/${roleLogin}/list`);
  }
};
