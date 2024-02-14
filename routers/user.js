const express = require("express");
const {
  createUser,
} = require("../controllers/authController");
const user = express.Router();

user.post("/signup", createUser);

module.exports = user;