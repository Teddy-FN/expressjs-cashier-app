const db = require("../db");

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  return db.pool.query(
    'SELECT id, "userName", password, role FROM public."User"',
    [],
    (err, response) => {
      console.log("RESPONSE =>", response);
      console.log("err =>", err);

      const dataResponse = response.rows.filter(
        (items) => items.userName === username && items.password === password
      )[0];
      console.log("dataResponse =>", dataResponse);
      if (dataResponse) {
        const role =
          dataResponse.role === "super-admin" || dataResponse.role === "admin";
        localStorage.setItem("userName", dataResponse.userName);
        localStorage.setItem("password", dataResponse.password);
        localStorage.setItem("role", dataResponse.role);
        localStorage.setItem("id", dataResponse.id);
        res.redirect(`/${role ? "admin" : "user"}/list`);
      } else {
        return next();
      }
    }
  );
};
