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

const Month = sequelize.define(
  "Month",
  {
    month_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    month_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "month",
    timestamps: false,
  }
);

const Expense = sequelize.define(
  "Expense",
  {
    expense_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "expenses",
    timestamps: false,
  }
);

Expense.belongsTo(User, { foreignKey: "user_id" });
Expense.belongsTo(Month, { foreignKey: "month_id" });
User.belongsTo(Role, { foreignKey: "role_name", targetKey: "role_name" });

module.exports = { User, Role, Month, Expense };
