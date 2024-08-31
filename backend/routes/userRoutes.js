const express = require("express");
const userController = require("../controllers/userController");
const monthController = require("../controllers/monthController");
const roleController = require("../controllers/roleController");
const expensesController = require("../controllers/expensesController");
const upload = require("../config/multer");

const router = express.Router();

router.post("/user", upload.single("avatar"), userController.signup);
router.get("/users", userController.getUsers);
router.get("/roles", roleController.getRoles);
router.post("/login", userController.login);
router.get("/user-info", userController.getUserInfo);
router.get("/months", monthController.getMonths);
router.post("/expenses", expensesController.addExpense);
router.get("/expenses/:user_id", expensesController.getExpensesByUserId);
router.delete(
  "/expenses/:user_id/:month_id/:year",
  expensesController.deleteExpenses
);
router.put("/expenses/:expense_id/", expensesController.updateExpenses);
router.get(
  "/expenses/:user_id/:startMonthName/:endMonthName/year",
  expensesController.getExpensesByUserId
);

module.exports = router;
