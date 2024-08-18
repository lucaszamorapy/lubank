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
      where: { user_id: user_id },
      include: [{ model: User }],
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteExpense = async (month_name, user_id) => {
  try {
    return await Expense.destroy({
      where: {
        month_name: month_name,
        user_id: user_id,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateExpense = async (expense_id, expenseUpdates) => {
  try {
    for (const expenseUpdate of expenseUpdates) {
      const expense = await Expense.findOne({
        where: { expense_id: expense_id },
      });

      if (!expense) {
        throw new Error("Expense not found");
      }

      await expense.update(expenseUpdate);
    }
    return { success: true };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  addExpenses,
  getExpensesByUserId,
  deleteExpense,
  updateExpense,
};
