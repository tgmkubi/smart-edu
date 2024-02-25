const express = require("express");
const { body } = require("express-validator");
const User = require("../models/User");
const { authMiddleware } = require("../middlewares/auth");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const { getDashboardPage } = require("../controllers/authController");
const user = express.Router();

user.post(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Please enter your name"),
    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .custom(async (userEmail) => {
        const user = await User.findOne({ email: userEmail });
        if (user) {
          throw new Error("E-mail already in use");
        }
      }),
    body("password").not().isEmpty().withMessage("Please enter valid password"),
  ],
  createUser
);
user.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter valid email"),
    body("password").not().isEmpty().withMessage("Please enter valid password"),
  ],
  loginUser
);
user.get("/logout", logoutUser);
user.get("/dashboard", authMiddleware, getDashboardPage);

module.exports = user;
