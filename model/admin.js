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

module.exports = class Admin {
  constructor({ id, img, category, productName, price }) {
    this.id = id;
    this.img = img;
    this.category = category;
    this.productName = productName;
    this.price = price;
  }

  // Save Product
  saveProduct() {
    if (!this.id) {
      product.push({
        id: Math.random(),
        img: this.img,
        category: this.category,
        productName: this.productName,
        price: this.price,
      });
    }
  }

  // Get Product By Id
  static getProductById(cb) {}

  // Get All Product
  static getAllProduct(cb) {
    return cb(product);
  }

  // Get All Data Graph
  static getAllGraph(cb) {
    return cb(dataGraph);
  }
};