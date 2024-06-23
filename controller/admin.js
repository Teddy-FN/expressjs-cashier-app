let product = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Nasgor",
    price: "20.000",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Bihun",
    price: "20.000",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Capcay",
    price: "20.000",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Soto",
    price: "20.000",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Bakso",
    price: "20.000",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Miso",
    price: "20.000",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Mie Gacoan",
    price: "20.000",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Indomie",
    price: "20.000",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Paklay",
    price: "20.000",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Makanan",
    productName: "Batagor",
    price: "20.000",
  },
];

const dataGraph = {
  data: {
    2021: [1, 2, 3, 10, 20],
    2022: [20, 30, 40, 50, 20, 10],
    2023: [20, 30, 40, 50, 20, 50, 60, 70, 80],
    2024: [20, 30, 40, 50, 20, 50, 60, 70, 80, 100, 120, 200],
  },
};

exports.home = (req, res, next) => {
  res.render("admin/home.ejs", {
    pageTitle: "Admin Page",
    prod: product,
    admin: true,
    url: req.protocol + "://" + req.header.host,
  });
};

// Render Add Form Product
exports.renderFormAdd = (req, res, next) => {
  res.render("admin/formProduct.ejs", {
    pageTitle: "Add Product",
    admin: true,
    url: req.protocol + "://" + req.header.host,
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
  product.push({
    id: Math.random(),
    img: req.body.image,
    category: req.body.category,
    productName: req.body.product,
    price: req.body.price,
  });
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

exports.filterGraph = (req, res, next) => {
  const data = dataGraph.data[req.body.year];
  res.render("admin/reportSelling.ejs", {
    pageTitle: "Report Selling",
    admin: true,
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
