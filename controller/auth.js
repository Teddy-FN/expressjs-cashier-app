const db = require("../db");

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
