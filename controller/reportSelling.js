const db = require("../db");
const moment = require("moment");
const monthNow = new Date().getMonth() + 1;

/*
SELECT EXTRACT(MONTH FROM create_date) AS MONTH, COUNT(item_checkout) FROM public."Invoice"
	WHERE EXTRACT(YEAR from create_date) = '2023'
	GROUP BY EXTRACT(MONTH FROM create_date)
*/

// Report Selling
exports.showGraph = async (req, res, next) => {
  const { year } = req.body;
  console.log(new Date().getFullYear().toString());
  await db.pool.query(
    `SELECT EXTRACT(MONTH FROM create_date) AS MONTH, COUNT(item_checkout) FROM public."Invoice" 
    WHERE EXTRACT(YEAR from create_date) = $1 
    GROUP BY EXTRACT(MONTH FROM create_date)`,
    [year ? year : new Date().getFullYear().toString()],
    (err, response) => {
      console.log("RES =>", response);

      let januari = 0,
        february = 0,
        march = 0,
        april = 0,
        may = 0,
        june = 0,
        july = 0,
        august = 0,
        september = 0,
        october = 0,
        november = 0,
        december = 0;

      if (response?.rows) {
        response?.rows?.forEach((items) => {
          if (items.month === "1") {
            januari = Number(items.count);
          } else if (items.month === "2") {
            february = Number(items.count);
          } else if (items.month === "3") {
            march = Number(items.count);
          } else if (items.month === "4") {
            april = Number(items.count);
          } else if (items.month === "5") {
            may = Number(items.count);
          } else if (items.month === "6") {
            june = Number(items.count);
          } else if (items.month === "7") {
            july = Number(items.count);
          } else if (items.month === "8") {
            august = Number(items.count);
          } else if (items.month === "9") {
            september = Number(items.count);
          } else if (items.month === "10") {
            october = Number(items.count);
          } else if (items.month === "11") {
            november = Number(items.count);
          } else if (items.month === "12") {
            december = Number(items.count);
          }
        });
      }

      const datas = [
        januari,
        february,
        march,
        april,
        may,
        june,
        july,
        august,
        september,
        october,
        november,
        december,
      ];

      console.log("datas =>", datas);
      console.log(
        "year ? year : new Date().getFullYear().toString() =>",
        year ? year : new Date().getFullYear().toString()
      );

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
          reportSelling: "/report-selling/show-graph",
        },
        year: year ? year : new Date().getFullYear().toString(),
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
        dataGraph: datas,
      });
    }
  );
};
