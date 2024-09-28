const Expense = require("../models/expensesModel.js");
const ResponseModel = require("../models/responseModel.js");
const User = require("../models/userModel.js");
const { Op } = require("sequelize");

const addExpenses = async (expenses) => {
  try {
    const createExpenses = await Expense.bulkCreate(expenses);
    return new ResponseModel(createExpenses, "Despesa(s) criadas com sucesso!");
  } catch (error) {
    return new ResponseModel(error, "Erro ao criar as despesa(s)");
  }
};

const getExpensesByUserId = async (user_id) => {
  try {
    const expenseUser = await Expense.findAll({
      where: { user_id: user_id },
    });
    if (!expenseUser) {
      return new ResponseModel(expenseUser, "Usuário não encontrado");
    }
    return new ResponseModel(
      expenseUser,
      "Busca da Despesa(s) do usuário realizada com sucesso"
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteExpense = async (user_id, month_id, year) => {
  try {
    const yearNumber = Number(year);
    const result = await Expense.destroy({
      where: {
        month_id: month_id,
        year: yearNumber,
        user_id: user_id,
      },
    });
    return new ResponseModel(result, "Despesa deletada com sucesso!");
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
      return new ResponseModel(null, "Despesa alterada com sucesso!");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const getExpensesByStatistic = async (user_id, startMonth, endMonth, year) => {
  try {
    const expenseStatistic = await Expense.findAll({
      where: {
        user_id: user_id,
        month_id: {
          [Op.between]: [startMonth, endMonth],
        },
        year: year,
      },
    });
    return new ResponseModel(
      expenseStatistic,
      "Gráfico atualizado com sucesso!"
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  addExpenses,
  getExpensesByUserId,
  deleteExpense,
  updateExpense,
  getExpensesByStatistic,
};
