const db = require("../config/db");

const createUser = (userData, callback) => {
  const sql =
    "INSERT INTO users (`username`, `email`, `role_id`, `password`, `created_at`) VALUES (?)";
  const values = [
    userData.name,
    userData.email,
    userData.role_id,
    userData.password,
    new Date(),
  ];
  db.query(sql, [values], (err, result) => {
    if (err) return callback(err);
    return callback(null, result);
  });
};

module.exports = {
  createUser,
};
