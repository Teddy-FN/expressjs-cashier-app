// Connect DB
const db = require("../db");
const moment = require("moment");
const date = moment().format("YYYY-MM-DD");
const fs = require("fs/promises");

// Render Add Form Product
exports.renderFormAdd = async (req, res, next) => {
  await db.pool.query(
    'SELECT * FROM public."Filtering" ORDER BY id ASC',
    [],
    (err, response) => {
      const newFiltering = response.rows.filter(
        (items) => items.name !== "Lihat Semua" && items.value !== "lihat semua"
      );

      console.log("response =>", response);
      res.render("admin/index.ejs", {
        pageTitle: "Add Product",
        admin: true,
        url: req.protocol + "://" + req.header.host,
        onPage: "add-product",
        activeTab: "add-product",
        isEdit: false,
        success: false,
        isError: false,

        // Filtering
        filtering: newFiltering,
        // End Filtering

        navigationActive: {
          list: "list",
          cart: "cart",
          addProduct: "add-product",
          addCategory: "add-category",
          editProduct: "edit-product",
          reportSelling: "report-selling",
        },
        urlNavigation: {
          list: "/admin/list",
          cart: "/admin/cart",
          addProduct: "/admin/add-product",
          addCategory: "/admin/add-category",
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
        deleteImage: false,
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
          deleteImage: false,
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
            deleteImage: false,
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

// Render Form Add Category
exports.renderAddCategory = async (req, res, next) => {
  return await res.render("admin/index.ejs", {
    pageTitle: "Add Category",
    admin: true,
    url: req.protocol + "://" + req.header.host,
    onPage: "add-category",
    activeTab: "add-category",
    isEdit: false,
    success: false,
    isError: false,
    filtering: [],
    navigationActive: {
      list: "list",
      cart: "cart",
      addProduct: "add-product",
      addCategory: "add-category",
      editProduct: "edit-product",
      reportSelling: "report-selling",
    },
    urlNavigation: {
      list: "/admin/list",
      cart: "/admin/cart",
      addProduct: "/admin/add-product",
      addCategory: "/admin/add-category",
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

exports.postAddCategory = async (req, res, next) => {
  const { nameCategory } = req.body;

  await db.pool.query(
    `INSERT INTO public."Filtering"(name, value) 
      SELECT '${nameCategory}', '${nameCategory.toLowerCase()}' WHERE NOT EXISTS (SELECT name, value FROM public."Filtering" WHERE name = '${nameCategory}' AND value = '${nameCategory.toLowerCase()}') RETURNING *`,
    [],
    (err, response) => {
      console.log("err =>", err);
      console.log("response =>", response);
      return res.render("admin/index.ejs", {
        pageTitle: "Add Category",
        admin: true,
        url: req.protocol + "://" + req.header.host,
        onPage: "add-category",
        activeTab: "add-category",
        isEdit: false,
        success: response.rows ? true : false,
        isError: response.rows.length < 1 ? true : false,
        filtering: [],
        navigationActive: {
          list: "list",
          cart: "cart",
          addProduct: "add-product",
          addCategory: "add-category",
          editProduct: "edit-product",
          reportSelling: "report-selling",
        },
        urlNavigation: {
          list: "/admin/list",
          cart: "/admin/cart",
          addProduct: "/admin/add-product",
          addCategory: "/admin/add-category",
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

// Delete file image
exports.deleteImage = async (req, res, next) => {
  console.log("REQ =>", req.body);
  const {
    deleteIdProduct,
    deleteNameproduct,
    deletePrice,
    deleteDescription,
    deleteCategory,
    deleteImage,
  } = req.body;

  await db.pool.query(
    'SELECT * FROM public."ListProduct" WHERE img = $1',
    [`assets/${deleteImage}`],
    (err, response) => {
      if (!response.rows) {
        fs.unlink(products.img);
        res.render("admin/formProduct.ejs", {
          pageTitle: deleteIdProduct ? "Edit Product" : "Add Product",
          admin: true,
          url: req.protocol + "://" + req.header.host,
          onPage: deleteIdProduct ? "edit-product" : "add-product",
          isEdit: deleteIdProduct ? true : false,
          deleteImage: true,
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
            id: deleteIdProduct ? Number(deleteIdProduct) : "",
            img: "",
            category: deleteCategory,
            product: deleteNameproduct,
            price: deletePrice,
            description: deleteDescription,
          },
        });
      }
      return res.render("admin/formProduct.ejs", {
        pageTitle: deleteIdProduct ? "Edit Product" : "Add Product",
        admin: true,
        url: req.protocol + "://" + req.header.host,
        onPage: deleteIdProduct ? "edit-product" : "add-product",
        isEdit: deleteIdProduct ? true : false,
        deleteImage: true,
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
          id: deleteIdProduct ? Number(deleteIdProduct) : "",
          img: "",
          category: deleteCategory,
          product: deleteNameproduct,
          price: deletePrice,
          description: deleteDescription,
        },
      });
    }
  );
};
