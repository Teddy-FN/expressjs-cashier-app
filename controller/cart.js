// Connect DB
const db = require("../db");
const invoiceDate = new Date();

// User Add To Cart
exports.Addcart = async (req, res, next) => {
  const allCokies = req?.headers?.cookie?.split("; ") || [];
  const getUserName = allCokies
    ?.filter((items) => items?.includes("userName"))?.[0]
    ?.replace("userName=", "");
  const getUserId = allCokies
    ?.filter((items) => items?.includes("id="))?.[0]
    ?.replace("id=", "");
  const { category, price, productName, count, img } = req.body;

  const priceNumber = Number(price?.replace("Rp", "")?.replace(".", ""));
  const countNumber = Number(count);

  const total = priceNumber * countNumber;

  return await db.pool.query(
    'INSERT INTO public."Cart"("productName", category, count, price, "totalPrice", "userId", "userName", img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      productName,
      category,
      count,
      price?.replace("Rp", "")?.replace(".", ""),
      total?.toString(),
      Number(getUserId),
      getUserName,
      img,
    ],
    (err, response) => {
      res.redirect("/admin/list");
    }
  );
};

// User Delete From List Cart
exports.deleteCart = async (req, res, next) => {
  const { idDeleteCart, deleteGetUserId, deleteGetUserName } = req.body;

  return await db.pool.query(
    'DELETE FROM public."Cart" WHERE (id = $1) AND ("userId" = $2) AND ("userName" = $3)',
    [idDeleteCart, Number(deleteGetUserId), deleteGetUserName],
    (err, response) => {
      res.redirect(`/admin/list`);
    }
  );
};

// Edit List In Cart
exports.editCart = async (req, res, next) => {
  const {
    idEditCart,
    productNameCart,
    priceCart,
    countNewCart,
    getUserId,
    getUserName,
    getCategory,
    img,
  } = req.body;

  const priceNumber = Number(priceCart.replace("Rp", "").replace(".", ""));
  const countNumber = Number(countNewCart);

  const total = priceNumber * countNumber;

  // Get All And Filter By ID
  return await db.pool.query(
    'UPDATE public."Cart" SET "productName" = $1, category = $2, count = $3, price = $4, "totalPrice" = $5, "userId" = $6, "userName" = $7, img = $8 WHERE id = $9',
    [
      productNameCart,
      getCategory,
      countNewCart,
      priceCart.replace("Rp", "").replace(".", ""),
      total.toString(),
      getUserId,
      getUserName,
      img,
      idEditCart,
    ],
    (err, response) => {
      res.redirect("/admin/list");
    }
  );
};

// Checkout Invoice
exports.invoice = async (req, res, next) => {
  const { invoiceProduct } = req.body;
  let itemsCheckout = "";
  let totalCheckout = 0;

  const formatInvoice = JSON.parse(invoiceProduct);

  formatInvoice.forEach((items, index) => {
    let indexing = index + 1;
    console.log(indexing);
    itemsCheckout += `${items.productName}${
      indexing === formatInvoice.length ? "." : ", "
    }`;
    totalCheckout += Number(items.totalPrice);
  });

  const allCokies = req?.headers?.cookie?.split("; ") || [];
  const getUserId = allCokies
    ?.filter((items) => items.includes("id="))?.[0]
    ?.replace("id=", "");
  const role = allCokies
    ?.filter((items) => items.includes("role="))?.[0]
    ?.replace("role=", "");
  const getUserName = allCokies
    ?.filter((items) => items.includes("userName"))?.[0]
    ?.replace("userName=", "");

  // So The Logic when invoice we delete from table cart by id and push to invoce table
  // Delete Table Cart
  return await db.pool.query(
    'DELETE FROM public."Cart" WHERE "userId" = $1 AND "userName" = $2',
    [Number(getUserId), getUserName],
    (err, responseDeleteCart) => {
      console.log("RESPONSE =>", responseDeleteCart);
      // Push / Insert Invoice Table
      return db.pool.query(
        'INSERT INTO public."Invoice"(item_checkout, total_checkout, user_name, user_id, create_date) VALUES ($1, $2, $3, $4, $5)',
        [
          itemsCheckout,
          totalCheckout,
          getUserName,
          Number(getUserId),
          invoiceDate,
        ],
        (err, response) => {
          res.redirect(`/${role === "user" ? "user" : "admin"}/list`);
        }
      );
    }
  );
};
