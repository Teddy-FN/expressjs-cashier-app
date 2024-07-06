const db = require("../db");

exports.renderFormLogin = (req, res, next) => {
  res.render("login.ejs", {
    pageTitle: "Login",
    url: req.protocol + "://" + req.header.host,
    error: "",
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  return db.pool.query(
    'SELECT id, "userName", password, role FROM public."User"',
    [],
    (err, response) => {
      const dataResponse = response?.rows?.filter(
        (items) => items.userName === username && items.password === password
      );
      const [data] = dataResponse || [];
      if (data) {
        const role = data.role === "super-admin" || data.role === "admin";
        res.cookie("userName", data.userName);
        res.cookie("password", data.password);
        res.cookie("role", data.role);
        res.cookie("id", data.id);
        res.redirect(`/${role ? "admin" : "user"}/list`);
      } else {
        return next();
      }
    }
  );
};

// Register
exports.registerNewUser = async (req, res, next) => {
  const { username, password, confirmationPassword } = req.body;

  if (password !== confirmationPassword) {
    res.render("register.ejs", {
      pageTitle: "Register New Account",
      url: req.protocol + "://" + req.header.host,
      error: "Password & Konfirmasi password tidak sama",
      success: false,
    });
  } else {
    return db.pool.query(
      'SELECT * FROM public."User" ORDER BY id ASC',
      [],
      (err, response) => {
        console.log("RESPONSE =>", response);
        const checkUser = response.rows.filter(
          (items) => items.userName === username
        )[0];

        if (checkUser) {
          res.render("register.ejs", {
            pageTitle: "Register New Account",
            url: req.protocol + "://" + req.header.host,
            error: "User sudah tersedia",
            success: false,
          });
        } else {
          console.log("cokk");
          return db.pool.query(
            'INSERT INTO public."User"("userName", password, role) VALUES ($1, $2, $3)',
            [username, password, "user"],
            (err, response) => {
              console.log("response response =>", response);
              res.render("register.ejs", {
                pageTitle: "Register New Account",
                url: req.protocol + "://" + req.header.host,
                error: "",
                success: true,
              });
            }
          );
        }
      }
    );
  }
};

// User Logout
exports.logout = (req, res, next) => {
  res.clearCookie("userName");
  res.clearCookie("password");
  res.clearCookie("role");
  res.clearCookie("id");
  res.redirect("/");
  return res.end();
};
