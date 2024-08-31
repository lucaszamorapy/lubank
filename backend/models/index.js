const User = require("./userModel");
const Role = require("./roleModel");
const Month = require("./monthModel");
const Expense = require("./expensesModel");

// Definindo associações
User.belongsTo(Role, { foreignKey: "role_name", targetKey: "role_name" });
Expense.belongsTo(User, { foreignKey: "user_id" });
Expense.belongsTo(Month, { foreignKey: "month_id", targetKey: "month_id" });

module.exports = {
  User,
  Role,
  Month,
  Expense,
};
