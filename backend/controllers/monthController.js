const { Month } = require("../models/allModels");

const getMonths = async (req, res) => {
  try {
    const months = await Month.findAll();
    return res.status(200).json(months);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMonths,
};
