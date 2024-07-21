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

const login = (req, res) => {
  const { username, password } = req.body;
  User.authenticateUser(username, password, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.message) return res.status(401).json({ error: result.message });

    res.status(200).json({ token: result.token });
  });
};

module.exports = {
  signup,
  getUsers,
  getRoles,
  login,
};
