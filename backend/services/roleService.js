const Role = require("../models/roleModel.js");

const getRoles = async () => {
  return await Role.findAll();
};

module.exports = {
  getRoles,
};
