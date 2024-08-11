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
    const { expense_id } = req.params;
    await expensesService.deleteExpense(expense_id);
    return res.status(200).json({ sucess: "Despesa deletada" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addExpense,
  getExpensesByUserId,
  deleteExpenses,
};
