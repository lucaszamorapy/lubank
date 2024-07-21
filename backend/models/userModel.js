const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = (userData, callback) => {
  // Verifica se o e-mail já está em uso
  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailSql, [userData.email], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) {
      return callback({ message: "Email already in use" });
    }

    // Verifica se o nome de usuário já está em uso
    const checkUsernameSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkUsernameSql, [userData.username], (err, results) => {
      if (err) return callback(err);
      if (results.length > 0) {
        return callback({ message: "Username already in use" });
      }

      // Se o e-mail e o nome de usuário não estiverem em uso, continua com a criação do usuário
      const hashedPassword = bcrypt.hashSync(userData.password, 10);
      const sql =
        "INSERT INTO users (`username`, `email`, `role_name`, `password`, `created_at`) VALUES (?)";
      const values = [
        [
          userData.username,
          userData.email,
          userData.role_name,
          hashedPassword,
          new Date(),
        ],
      ];
      db.query(sql, [values], (err, result) => {
        if (err) return callback(err);
        return callback(null, result);
      });
    });
  });
};

const getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

const getAllRoles = (callback) => {
  const sql = "SELECT * FROM roles";
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    return callback(null, results);
  });
};

const authenticateUser = (username, password, callback) => {
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0)
      return callback(null, { message: "User not found" });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return callback(null, { message: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, username: user.username, password: user.password },
      "YOUR_SECRET_KEY",
      { expiresIn: "1h" }
    );

    return callback(null, { token });
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getAllRoles,
  authenticateUser,
};
