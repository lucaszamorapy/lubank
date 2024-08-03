const roleService = require("../services/roleService");

const getRoles = async (req, res) => {
  try {
    const roles = await roleService.getRoles();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getRoles,
};
