exports.error = (req, res, next) => {
  res.render("404.ejs", {
    pageTitle: "404 Error",
  });
};
