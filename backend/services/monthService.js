const Month = require("../models/monthModel.js");

const getMonths = async () => {
  try {
    return await Month.findAll();
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getMonths,
};
