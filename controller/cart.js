// Connect DB
const db = require("../db");

// User Add To Cart
exports.Addcart = async (req, res, next) => {
  const allCokies = req.headers.cookie.split("; ");
  const getUserName = allCokies
    ?.filter((items) => items.includes("userName"))?.[0]
    ?.replace("userName=", "");
  const getUserId = allCokies
    ?.filter((items) => items.includes("id="))?.[0]
    ?.replace("id=", "");
  const { category, price, productName, count } = req.body;

  const priceNumber = Number(price.replace("Rp", "").replace(".", ""));
  const countNumber = Number(count);

  const total = priceNumber * countNumber;

  await db.pool.query(
    'INSERT INTO public."Cart"("productName", category, count, price, "totalPrice", "userId", "userName") VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      productName,
      category,
      count,
      price.replace("Rp", "").replace(".", ""),
      total.toString(),
      Number(getUserId),
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
    'DELETE FROM public."Cart" WHERE (id = $1) AND ("userId" = $2) AND ("userName" = $3)',
    [id, Number(userId), userName],
    (err, response) => {
      // const dataResponse = response?.rows?.filter(
      //   (items) => items.userName === userName && items.password === password
      // );
      // const [data] = dataResponse || [];
      // const role = data.role === "super-admin" || data.role === "admin";
      res.redirect(`/admin/list`);
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

  const priceNumber = Number(priceCart.replace("Rp", "").replace(".", ""));
  const countNumber = Number(countNewCart);

  const total = priceNumber * countNumber;

  // Get All And Filter By ID
  return await db.pool.query(
    'UPDATE public."Cart" SET "productName" = $1, category = $2, count = $3, price = $4, "totalPrice" = $5, "userId" = $6, "userName" = $7 WHERE id = $8',
    [
      productNameCart,
      getCategory,
      countNewCart,
      priceCart.replace("Rp", "").replace(".", ""),
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
  // console.log("REQ =>", req.app);
  // console.log("REQ POST =>", req.app.post());
  // console.log("REQ POST =>", req.app.post());
  // const SetLocalStorage = require("node-localstorage").LocalStorage;
  // const localStorage = new SetLocalStorage("./user");
  // const getUserId = localStorage.getItem("id");
  // console.log("getUserId =>", getUserId);
  // console.log("getUstypoferId =>", typeof getUserId);
  // await db.pool.query(
  //   'SELECT * FROM public."Cart" WHERE ("userId" = $1)',
  //   [Number(getUserId)],
  //   async (err, response) => {
  //     res.redirect("/");
  //     // admin.home(response);
  //   }
  // );
};
