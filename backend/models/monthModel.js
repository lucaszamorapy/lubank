const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Month = sequelize.define(
  "Month",
  {
    month_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    month_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "month",
    timestamps: false,
  }
);

module.exports = Month;
