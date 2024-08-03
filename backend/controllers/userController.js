const userService = require("../services/userService");
const upload = require("../config/multer");

const signup = async (req, res) => {
  try {
    const { username, email, role_name, password } = req.body;
    const avatar = req.file ? req.file.path : null;

    const newUser = await userService.signup(
      username,
      email,
      role_name,
      password,
      avatar
    );
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await userService.getRoles();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await userService.login(username, password);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const getUserInfo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const userInfo = await userService.getUserInfo(token);
    return res.status(200).json(userInfo);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

module.exports = {
  signup,
  getUsers,
  getRoles,
  login,
  getUserInfo,
};
