// Connect DB
const db = require("../db");

exports.Addcart = async (req, res, next) => {
  console.log("REQ =>", req.body);

  const { category, price, productName, count } = req.body;

  const priceNumber = Number(price);
  const countNumber = Number(count);

  const total = priceNumber * countNumber;

  await db.pool.query(
    'INSERT INTO public."Cart"("productName", category, count, price, "totalPrice") VALUES ($1, $2, $3, $4, $5)',
    [productName, category, count, price, total.toString()],
    (err, response) => {
      res.redirect("/admin/list");
    }
  );
};

exports.invoice = async (req, res, next) => {
  console.log("REQ =>", req.body);

  // const { category, price, productName, count } = req.body;

  // const priceNumber = Number(price);
  // const countNumber = Number(count);

  // const total = priceNumber * countNumber;

  // await db.pool.query(
  //   'INSERT INTO public."Cart"("productName", category, count, price, "totalPrice") VALUES ($1, $2, $3, $4, $5)',
  //   [productName, category, count, price, total.toString()],
  //   (err, response) => {
  //     res.redirect("/admin/list");
  //   }
  // );
};
