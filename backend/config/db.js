const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "contabilze",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

module.exports = db;
