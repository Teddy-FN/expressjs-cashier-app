// Connect DB
const db = require("../db");
const moment = require("moment");
const fs = require("fs/promises");
const date = moment().format("YYYY-MM-DD");

const dataGraph = {
  data: {
    2021: [1, 2, 3, 10, 20],
    2022: [20, 30, 40, 50, 20, 10],
    2023: [20, 30, 40, 50, 20, 50, 60, 70, 80],
    2024: [20, 30, 40, 50, 20, 50, 60, 70, 80, 100, 120, 200],
  },
};

exports.home = async (req, res, next) => {
  var getDataTotal = null;

  console.log("getDataTotal =>", getDataTotal);

  return await db.pool.query(
    'SELECT * FROM public."ListProduct"',
    (err, responseProd) => {
      return db.pool.query(
        'SELECT * FROM public."Cart" ORDER BY id ASC',
        (err, responseCart) => {
          if (res.statusCode === 200) {
            res.render("home.ejs", {
              pageTitle: "Admin Page",
              prod: responseProd?.rows,
              cart: responseCart.rows,
              admin: true,
              url: req.protocol + "://" + req.header.host,
              // New
              name: "test",
              // End New
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
};

// Render Add Form Product
exports.renderFormAdd = (req, res, next) => {
  res.render("admin/formProduct.ejs", {
    pageTitle: "Add Product",
    admin: true,
    url: req.protocol + "://" + req.header.host,
    onPage: "add-product",
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
    item: {
      id: null,
      img: null,
      category: null,
      productName: null,
      price: null,
    },
  });
};

// Function Post Add Form Product
exports.postAddProduct = async (req, res, next) => {
  const { category, product, price } = req.body;
  const { path } = req.file;

  const postData = await db.pool.query(
    'INSERT INTO public."ListProduct"("productName", category, img, price, "createdDate", "modifiedDate") VALUES ($1, $2, $3, $4, $5, $6)',
    [product, category, path, price, date, date]
  );
  console.log("postData =>", postData);
  res.redirect("/admin/list");
};

// Render Edit Form Product
exports.renderFormEdit = async (req, res, next) => {
  return await db.pool.query(
    'SELECT * FROM public."ListProduct" WHERE id = $1',
    [req.params.id],
    (err, response) => {
      const [product] = response?.rows || {};
      console.log("renderFormEdit", product);
      if (res.statusCode === 200) {
        res.render("admin/formProduct.ejs", {
          pageTitle: "Edit Product",
          admin: true,
          url: req.protocol + "://" + req.header.host,
          onPage: "edit-product",
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
          item: {
            id: product.id,
            img: product.img,
            category: product.category,
            product: product.productName,
            price: product.price,
          },
        });
      }
    }
  );
};

// Function Put Edit Form Product
exports.EditProduct = async (req, res, next) => {
  const id = Number(req.params.id);
  const { product, price, category } = req.body;
  const { path } = req.file;
  // Function Get Detail By ID and remove Image From Assets
  await db.pool.query(
    'SELECT * FROM public."ListProduct" WHERE id = $1',
    [id],
    (err, response) => {
      const [product] = response?.rows || {};
      // fs.unlink(product.img);
    }
  );

  // Function Edit Product
  await db.pool.query(
    'UPDATE public."ListProduct" SET "productName" = $1, category = $2, img = $3, price = $4, "createdDate" = $5, "modifiedDate" = $6 WHERE id = $7 RETURNING *;',
    [product, category, path, price, date, date, id],
    (err, response) => {
      res.redirect("/admin/list");
    }
  );
};

// Delete
exports.deleteProduct = async (req, res, next) => {
  const id = req.body.id;
  await db.pool.query(
    'DELETE FROM public."ListProduct" WHERE id = $1;',
    [id],
    (err, response) => {
      res.redirect("/admin/list");
    }
  );
};

// Report Selling
exports.showGraph = (req, res, next) => {
  res.render("admin/reportSelling.ejs", {
    pageTitle: "Report Selling",
    admin: true,
    url: req.protocol + "://" + req.header.host,
    onPage: "report-selling",
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
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    dataGraph: dataGraph.data[`${new Date().getFullYear()}`],
  });
};

// Filter Report Selling By Year
exports.filterGraph = (req, res, next) => {
  const data = dataGraph.data[req.body.year];
  res.render("admin/reportSelling.ejs", {
    pageTitle: "Report Selling",
    admin: true,
    url: req.protocol + "://" + req.header.host,
    onPage: "report-selling",
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
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    dataGraph: data,
  });
};

// Render Cart
exports.renderCart = (req, res, next) => {
  res.render("user/cart.ejs", {
    url: req.protocol + "://" + req.header.host,
    pageTitle: "Cart Product",
    onPage: "cart",
    admin: true,
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
};
