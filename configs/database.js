require("dotenv").config()

module.exports = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
};