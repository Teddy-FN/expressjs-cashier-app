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

exports.user = (req, res, next) => {
  res.render("user/home.ejs", {
    pageTitle: "User Page",
    prod: product,
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
};
