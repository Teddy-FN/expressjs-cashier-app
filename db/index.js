const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // user: process.env.USERPOSTGREE,
  // database: process.env.DATABASE,
  // password: process.env.PASSWORD,
  // port: parseInt(process.env.PORT || "5432"),
  // host: process.env.HOST,
  // connectionTimeoutMillis: 200,
});

module.exports = {
  pool,
};
