const expensesService = require("../services/expensesService");

const addExpense = async (req, res) => {
  try {
    const expenses = req.body.expenses;
    const createdExpenses = await expensesService.addExpenses(expenses);
    return res.status(201).json(createdExpenses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getExpensesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const expenses = await expensesService.getExpensesByUserId(user_id);
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteExpenses = async (req, res) => {
  try {
    const { user_id, month_id, year } = req.params;
    const deleteExpense = await expensesService.deleteExpense(
      user_id,
      month_id,
      year
    );
    return res.status(200).json(deleteExpense);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateExpenses = async (req, res) => {
  try {
    const { expense_id } = req.params;
    const expenses = req.body.expenses;
    const updateExpense = await expensesService.updateExpense(
      expense_id,
      expenses
    );
    return res.status(200).json(updateExpense);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getExpensesByStatistic = async (req, res) => {
  try {
    const { user_id, startMonth, endMonth, year } = req.params;
    const expenses = await expensesService.getExpensesByStatistic(
      user_id,
      startMonth,
      endMonth,
      year
    );
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addExpense,
  getExpensesByUserId,
  deleteExpenses,
  updateExpenses,
  getExpensesByStatistic,
};
