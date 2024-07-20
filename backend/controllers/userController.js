const User = require("../models/userModel");

const signup = (req, res) => {
  User.createUser(req.body, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json(data);
  });
};

module.exports = {
  signup,
};
