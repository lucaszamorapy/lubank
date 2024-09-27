const express = require("express");
const userController = require("../controllers/userController");
const monthController = require("../controllers/monthController");
const expensesController = require("../controllers/expensesController");
const createMulterConfig = require("../middlewares/uploadImge");
const upload = createMulterConfig();

const router = express.Router();

router.post("/user", upload.single("avatar"), userController.signup);
router.get("/users", userController.getUsers);
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
  "/expenses/:user_id/:startMonth/:endMonth/:year",
  expensesController.getExpensesByStatistic
);
router.put(
  "/user/:user_id/",
  upload.single("avatar"),
  userController.updateUser
);
router.post("/forgot-password", userController.requestPasswordReset);
router.post("/forgot-password/:token", userController.resetPassword);

module.exports = router;
