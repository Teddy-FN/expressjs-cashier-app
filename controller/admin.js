const dataGraph = {
  data: {
    2021: [1, 2, 3, 10, 20],
    2022: [20, 30, 40, 50, 20, 10],
    2023: [20, 30, 40, 50, 20, 50, 60, 70, 80],
    2024: [20, 30, 40, 50, 20, 50, 60, 70, 80, 100, 120, 200],
  },
};

// Models
const AdminModels = require("../model/admin");

exports.home = (req, res, next) => {
  AdminModels.getAllProduct((product) => {
    console.log("PRoduct", product);
    res.render("admin/home.ejs", {
      pageTitle: "Admin Page",
      prod: product,
      admin: true,
      url: req.protocol + "://" + req.header.host,
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
  });
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
exports.postAddProduct = (req, res, next) => {
  const product = new AdminModels({
    id: null,
    img: req.body.image,
    category: req.body.category,
    productName: req.body.product,
    price: req.body.price,
  });
  product.saveProduct();
  res.redirect("/admin/list");
};

// Render Edit Form Product
exports.renderFormEdit = (req, res, next) => {
  const getProduct = product.filter(
    (items) => items.id === Number(req.params.id)
  );
  const [prouduct] = getProduct;

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
      id: prouduct.id,
      img: prouduct.img,
      category: prouduct.category,
      product: prouduct.productName,
      price: prouduct.price,
    },
  });
};

// Function Put Edit Form Product
exports.EditProduct = (req, res, next) => {
  const getIndexProduct = product.findIndex(
    (items) => items.id === Number(req.params.id)
  );
  console.log("getIndexProduct =>", getIndexProduct);

  product[getIndexProduct] = {
    id: req.params.id,
    img: req.body.image,
    category: req.body.category,
    productName: req.body.product,
    price: req.body.price,
  };

  res.redirect("/admin/list");
};

// Delete
exports.deleteProduct = (req, res, next) => {
  const products = product.filter((items) => items.id !== Number(req.body.id));
  console.log(products);
  product = products;
  res.redirect("/admin/list");
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
