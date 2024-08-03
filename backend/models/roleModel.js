const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define(
  "Role",
  {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Role;
