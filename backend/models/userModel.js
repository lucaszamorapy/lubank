const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Supondo que você tem um arquivo de configuração para o Sequelize

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING, // Tipo de dado para armazenar URLs ou caminhos de arquivos
      allowNull: true, // Permite que a coluna seja nula, se desejado
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

const Role = sequelize.define(
  "Role",
  {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

User.belongsTo(Role, { foreignKey: "role_name", targetKey: "role_name" });

module.exports = { User, Role };
