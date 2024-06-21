const product = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "food",
    productName: "Makanan",
    price: "20.000",
  },
];

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
  });
};

// Function Post Add Form Product
exports.postAddProduct = (req, res, next) => {
  console.log("REQ BODY =>", req);
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

// Function Put Edit Form Product

// Delete

// Report Selling
