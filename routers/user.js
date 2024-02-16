const express = require("express");
const { authMiddleware } = require("../middlewares/auth");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const { getDashboardPage } = require("../controllers/authController");
const user = express.Router();

user.post("/signup", createUser);
user.post("/login", loginUser);
user.get("/logout", logoutUser);
user.get("/dashboard", authMiddleware, getDashboardPage);

module.exports = user;
