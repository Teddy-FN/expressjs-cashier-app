// Connect DB
const db = require("../db");

// User Add To Cart
exports.Addcart = async (req, res, next) => {
  const SetLocalStorage = require("node-localstorage").LocalStorage;
  const localStorage = new SetLocalStorage("./user");
  const getUserName = localStorage.getItem("userName");
  const getUserId = localStorage.getItem("id");
  const { category, price, productName, count } = req.body;

  const priceNumber = Number(price);
  const countNumber = Number(count);

  const total = priceNumber * countNumber;

  await db.pool.query(
    'INSERT INTO public."Cart"("productName", category, count, price, "totalPrice", "userId", "userName") VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      productName,
      category,
      count,
      price.toString(),
      total.toString(),
      getUserId,
      getUserName,
    ],
    (err, response) => {
      res.redirect("/admin/list");
    }
  );
};

// User Delete From List Cart
exports.deleteCart = async (req, res, next) => {
  const { id, userId, userName } = req.params;

  await db.pool.query(
    'DELETE FROM public."Cart" WHERE id = $1',
    [Number(id)],
    (err, response) => {
      res.redirect("/admin/list");
    }
  );
};

// Edit List In Cart
exports.editCart = async (req, res, next) => {
  console.log("REQ =>", req.body);

  const {
    idEditCart,
    productNameCart,
    priceCart,
    countNewCart,
    getUserId,
    getUserName,
    getCategory,
  } = req.body;

  const priceNumber = Number(priceCart);
  const countNumber = Number(countNewCart);

  const total = priceNumber * countNumber;

  // Get All And Filter By ID
  return await db.pool.query(
    'UPDATE public."Cart" SET "productName" = $1, category = $2, count = $3, price = $4, "totalPrice" = $5, "userId" = $6, "userName" = $7 WHERE id = $8',
    [
      productNameCart,
      getCategory,
      countNewCart,
      priceCart.toString(),
      total.toString(),
      getUserId,
      getUserName,
      idEditCart,
    ],
    (err, response) => {
      res.redirect("/admin/list");
    }
  );
};

// Checkout Invoice
exports.invoice = async (req, res, next) => {
  console.log("REQ =>", req.body);
  // const SetLocalStorage = require("node-localstorage").LocalStorage;
  // const localStorage = new SetLocalStorage("./user");
  // const getUserName = localStorage.getItem("userName");
  // const getUserId = localStorage.getItem("id");
  // const getUserPassword = localStorage.getItem("password");
  // const getUserRole = localStorage.getItem("role");

  // const { category, price, productName, count } = req.body;

  // const priceNumber = Number(price);
  // const countNumber = Number(count);

  // totalPrice = priceNumber * countNumber;

  // await db.pool.query(
  //   'INSERT INTO public."Cart"("productName", category, count, price, "totalPrice") VALUES ($1, $2, $3, $4, $5)',
  //   [productName, category, count, price, total.toString()],
  //   (err, response) => {
  //     res.redirect("/admin/list");
  //   }
  // );
};
