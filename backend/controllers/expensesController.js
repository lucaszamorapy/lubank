const { Expense, Month, User } = require("../models/allModels");

const addExpense = async (req, res) => {
  try {
    const expenses = req.body.expenses;
    const createdExpenses = await Expense.bulkCreate(expenses);
    return res.status(201).json(createdExpenses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getExpensesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const expenses = await Expense.findAll({
      where: {
        user_id,
      },
      include: [{ model: User }],
    });
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addExpense,
  getExpensesByUserId,
};
