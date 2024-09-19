const User = require("./userModel");
const Month = require("./monthModel");
const Expense = require("./expensesModel");

// Definindo associações
Expense.belongsTo(User, { foreignKey: "user_id" });
Expense.belongsTo(Month, { foreignKey: "month_id", targetKey: "month_id" });

module.exports = {
  User,
  Month,
  Expense,
};
