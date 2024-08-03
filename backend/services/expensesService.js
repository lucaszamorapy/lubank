const Expense = require("../models/expensesModel.js");
const User = require("../models/userModel.js");

const addExpenses = async (expenses) => {
  try {
    return await Expense.bulkCreate(expenses);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getExpensesByUserId = async (user_id) => {
  try {
    return await Expense.findAll({
      where: { user_id },
      include: [{ model: User }],
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  addExpenses,
  getExpensesByUserId,
};
