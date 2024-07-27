const express = require("express");
const userController = require("../controllers/userController");
const upload = require("../config/multer");

const router = express.Router();

router.post("/user", upload.single("avatar"), userController.signup);
router.get("/users", userController.getUsers);
router.get("/roles", userController.getRoles);
router.post("/login", userController.login);
router.get("/user-info", userController.getUserInfo);

module.exports = router;
