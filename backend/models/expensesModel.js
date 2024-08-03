const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Supondo que você tem um arquivo de configuração para o Sequelize

const Expense = sequelize.define(
  "Expense",
  {
    expense_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "expenses",
    timestamps: false,
  }
);

module.exports = Expense;
