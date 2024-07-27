// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("contabilze", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
