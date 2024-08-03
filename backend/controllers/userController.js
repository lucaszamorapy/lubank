// controllers/userController.js
const User = require("../models/userModel.js");
const Role = require("../models/roleModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../config/multer");

const signup = async (req, res) => {
  try {
    const { username, email, role_name, password } = req.body;
    const avatar = req.file ? req.file.path : null; // Pega o caminho do arquivo, se houver

    // Verifica se o email ou o username já estão em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      role_name,
      password: hashedPassword,
      avatar, // Adiciona o caminho da imagem
    });

    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } }); //entra na tabela User e procura com o resultado digitado
    if (!user) {
      return res.status(401).json({ error: "User not found" }); //caso nao exista
    }

    const isMatch = await bcrypt.compare(password, user.password); //verifica a senha digitada com a senha do usuário encontrado

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username }, //gerar o token
      "YOUR_SECRET_KEY",
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token }); //retornar o token
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Novo endpoint para obter informações do usuário
const getUserInfo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role_name: user.role_name,
      avatar: user.avatar,
    });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = {
  signup,
  getUsers,
  getRoles,
  login,
  getUserInfo,
};
