const User = require("../models/userModel");

const signup = (req, res) => {
  User.createUser(req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json(data);
  });
};

const getUsers = (req, res) => {
  User.getAllUsers((err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const getRoles = (req, res) => {
  User.getAllRoles((err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

module.exports = {
  signup,
  getUsers,
  getRoles,
};
