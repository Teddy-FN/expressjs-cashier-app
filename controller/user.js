exports.user = (req, res, next) => {
  res.render("user/home.ejs", {
    pageTitle: "User Page",
    admin: false,
    url: req.protocol + "://" + req.header.host,
  });
};
