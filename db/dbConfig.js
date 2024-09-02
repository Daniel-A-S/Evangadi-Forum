const mysql = require("mysql2");

const dbConnection = mysql.createPool({
  user: process.env.USER,
  host: "localhost",
  password: process.env.PASSWORD,
  connectionLimit: 10,
  database: process.env.DATABASE,
});

module.exports = dbConnection.promise();