// Connect DB
const db = require("../db");
const moment = require("moment");
const date = moment().format("YYYY-MM-DD");
const fs = require("fs/promises");

// Render Add Form Product
exports.renderFormAdd = (req, res, next) => {
  res.render("admin/formProduct.ejs", {
    pageTitle: "Add Product",
    admin: true,
    url: req.protocol + "://" + req.header.host,
    onPage: "add-product",
    isEdit: false,
    success: false,
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
    item: {
      id: null,
      img: null,
      category: null,
      productName: null,
      price: null,
      description: null,
    },
  });
};

// Function Post Add Form Product
exports.postAddProduct = async (req, res, next) => {
  const { category, product, price, description } = req.body;
  const { path } = req.file;

  await db.pool.query(
    'INSERT INTO public."ListProduct"("productName", category, img, price, "createdDate", "modifiedDate", description) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [product, category, path, price, date, date, description],
    (err, response) => {
      res.render("admin/formProduct.ejs", {
        pageTitle: "Add Product",
        admin: true,
        url: req.protocol + "://" + req.header.host,
        onPage: "add-product",
        isEdit: false,
        success: true,
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
        item: {
          id: null,
          img: null,
          category: null,
          productName: null,
          price: null,
          description: null,
        },
      });
    }
  );
};

// Render Edit Form Product
exports.renderFormEdit = async (req, res, next) => {
  return await db.pool.query(
    'SELECT * FROM public."ListProduct" WHERE id = $1',
    [req?.params?.id],
    (err, response) => {
      const [product] = response?.rows || [];
      if (res.statusCode === 200) {
        res.render("admin/formProduct.ejs", {
          pageTitle: "Edit Product",
          admin: true,
          url: req.protocol + "://" + req.header.host,
          onPage: "edit-product",
          isEdit: true,
          success: false,
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
          item: {
            id: product?.id,
            img: product?.img,
            category: product?.category,
            product: product?.productName,
            price: product?.price,
            description: product?.description,
          },
        });
      }
    }
  );
};

// Function Put Edit Form Product
exports.EditProduct = async (req, res, next) => {
  const id = Number(req?.params?.id);
  const { product, price, category, description } = req?.body;

  // Function Get Detail By ID and remove Image From Assets
  await db.pool.query(
    'SELECT * FROM public."ListProduct" WHERE id = $1',
    [id],
    (err, response) => {
      const [products] = response?.rows || [];
      if (req?.file?.path) {
        fs.unlink(products.img);
      }

      // Function Edit Product
      return db.pool.query(
        'UPDATE public."ListProduct" SET "productName" = $1, category = $2, img = $3, price = $4, "createdDate" = $5, "modifiedDate" = $6, description = $7 WHERE id = $8',
        [
          product,
          category,
          req?.file?.path ? req?.file?.path : products?.img,
          price,
          date,
          date,
          description,
          id,
        ],
        (err, response) => {
          res.render("admin/formProduct.ejs", {
            pageTitle: "Edit Product",
            admin: true,
            url: req.protocol + "://" + req.header.host,
            onPage: "edit-product",
            isEdit: true,
            success: true,
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
            item: {
              id: null,
              img: null,
              category: null,
              productName: null,
              price: null,
              description: null,
            },
          });
        }
      );
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
      reportSelling: "/report-selling/show-graph",
    },
  });
};
