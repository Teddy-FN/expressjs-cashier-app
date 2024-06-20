exports.home = (req, res, next) => {
  res.render("admin/home.ejs", {
    pageTitle: "Admin Page",
    admin: true,
    url: req.protocol + "://" + req.header.host,
  });
};
