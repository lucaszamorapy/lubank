const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");
require("dotenv").config();

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

const requestPasswordReset = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hora

  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;
  await user.save(); // salva as alterações no banco de dados

  const resetUrl = `http://localhost:5173/forgot-password/${resetToken}`;

  await transporter.sendMail({
    to: process.env.EMAIL_USER,
    subject: "Redefinição de Senha",
    html: `<p>Você solicitou a redefinição de senha. Clique <a href="${resetUrl}">aqui</a> para redefinir sua senha.</p>`,
  });

  return { message: "Email de redefinição de senha enviado!" };
};

const resetPassword = async (token, password) => {
  if (!password) {
    throw new Error("Digite a sua nova senha");
  }

  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Token inválido ou expirado");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });
  } catch (error) {
    console.error("Erro ao gerar hash da senha:", error);
    throw new Error("Erro ao redefinir a senha");
  }

  return { message: "Senha redefinida com sucesso!" };
};

module.exports = {
  signup,
  getUsers,
  login,
  getUserInfo,
  updateUser,
  requestPasswordReset,
  resetPassword,
};
