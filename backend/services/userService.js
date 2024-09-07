const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const signup = async (username, email, role_name, password, avatar) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) {
    throw new Error("Username already in use");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await User.create({
    username,
    email,
    role_name,
    password: hashedPassword,
    avatar,
  });
};

const getUsers = async () => {
  return await User.findAll();
};

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "YOUR_SECRET_KEY",
    { expiresIn: "1h" }
  );

  return token;
};

const getUserInfo = async (token) => {
  const decoded = jwt.verify(token, "YOUR_SECRET_KEY"); //pega o token para encontrar o user
  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role_name: user.role_name,
    avatar: user.avatar,
  };
};

module.exports = {
  signup,
  getUsers,
  login,
  getUserInfo,
};
