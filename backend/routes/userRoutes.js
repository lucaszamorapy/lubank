const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/user", userController.signup);
router.get("/users", userController.getUsers);
router.get("/roles", userController.getRoles);
router.post("/login", userController.login);

module.exports = router;
