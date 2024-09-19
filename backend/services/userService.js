const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const signup = async (username, email, password, avatar) => {
  // Verifica se o email já está em uso
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Verifica se o username já está em uso
  const existingUsername = await User.findOne({ where: { username } });
  if (existingUsername) {
    throw new Error("Username already in use");
  }

  // Verifica se a senha foi fornecida
  if (!password) {
    throw new Error("Password is required");
  }

  const saltRounds = 10;

  // Garante que estamos passando valores válidos para bcrypt.hash
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return await User.create({
    username,
    email,
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
    avatar: user.avatar,
  };
};

const updateUser = async (id, user) => {
  try {
    const existUser = await User.findOne({
      where: { id: id },
    });

    if (!existUser) {
      throw new Error("User not found");
    }

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    return await existUser.update(user);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  signup,
  getUsers,
  login,
  getUserInfo,
  updateUser,
};
