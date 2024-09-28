const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");
const ResponseModel = require("../models/responseModel.js");
require("dotenv").config();

const signup = async (username, email, password, avatar) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("E-mail já em uso");
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      throw new Error("Username já em uso");
    }

    if (!password) {
      throw new Error("Senha é obrigatória");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userCreate = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    return new ResponseModel(userCreate, "Usuário registrado com sucesso!");
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return new ResponseModel(users, "Busca de usuários realizado com sucesso!");
  } catch (err) {
    throw new Error(err.message);
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error("Usuário não existe");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Senha inváldia");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      "YOUR_SECRET_KEY",
      { expiresIn: "1h" }
    );

    return new ResponseModel(token, `Bem-vindo usuário ${user.username}`);
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserInfo = async (token) => {
  try {
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY"); //pega o token para encontrar o user
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return new ResponseModel(null, "Usuário não encontrado");
    }

    return new ResponseModel(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      `Busca do usuário ${user.username} realizado com sucesso`
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateUser = async (id, user) => {
  try {
    const existUser = await User.findOne({
      where: { id: id },
    });

    if (!existUser) {
      return new ResponseModel(null, "Usuário não encontrado");
    }

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    const updateUser = await existUser.update(user);
    return new ResponseModel(updateUser, "Usuário alterado com sucesso!");
  } catch (err) {
    throw new Error(err.message);
  }
};

const requestPasswordReset = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return new ResponseModel(null, "Usuário não encontrado");
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

    return new ResponseModel(
      null,
      "Uma verificação foi enviada ao seu e-mail!"
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

const resetPassword = async (token, password) => {
  if (!password) {
    throw new Error("Digite a sua nova senha");
  }

  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        [Op.gt]: new Date(), // Op.gt = maior que
      },
    },
  });

  if (!user) {
    return new ResponseModel(null, "Token inválido ou expirado");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await user.update({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });
    return new ResponseModel(null, "Senha redefinida com sucesso!");
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
  requestPasswordReset,
  resetPassword,
};
