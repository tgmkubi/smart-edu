const express = require("express");
const {
  createUser,
  loginUser,
} = require("../controllers/authController");
const user = express.Router();

user.post("/signup", createUser);
user.post("/login", loginUser);

module.exports = user;