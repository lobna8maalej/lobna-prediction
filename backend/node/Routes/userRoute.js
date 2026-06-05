const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/db");
const {
  register,
  login,
} = require("../Controllers/userController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;