const Month = require("../models/monthModel.js");
const ResponseModel = require("../models/responseModel.js");

const getMonths = async () => {
  try {
    const months = await Month.findAll();
    return new ResponseModel(months, "Busca dos meses realizado com sucesso");
  } catch (error) {
    return new ResponseModel(error, "Ocorreu um erro ao buscar os meses");
  }
};

module.exports = {
  getMonths,
};
