const Month = require("../services/monthService");

const getMonths = async (req, res) => {
  try {
    const months = await Month.getMonths.findAll();
    return res.status(200).json(months);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMonths,
};
