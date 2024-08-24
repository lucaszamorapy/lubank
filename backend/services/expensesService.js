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

const deleteExpense = async (user_id, month_name, year) => {
  console.log(
    `Attempting to delete expense with month_name: ${month_name}, year: ${year}, user_id: ${user_id}`
  );
  try {
    const yearNumber = Number(year);
    const result = await Expense.destroy({
      where: {
        month_name: month_name,
        year: yearNumber,
        user_id: user_id,
      },
    });
    console.log(`Number of records deleted: ${result}`);
    return result;
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
