const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { User, Role, Month, Expense } = require("./models");
const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});
