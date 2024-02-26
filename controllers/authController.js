const { validationResult } = require("express-validator");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
const { comparePassword } = require("../helpers/input/inputHelpers");

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    return res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    errors.array().forEach((error) => {
      req.flash("error", `${error.msg}\n`);
    });
    return res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash("error", "There is no user with that email!");
      return res.status(400).redirect("/login");
    } else {
      const passwordIsCorrect = await comparePassword(password, user.password);
      if (!passwordIsCorrect) {
        req.flash("error", "Your password is not correct!");
        return res.status(400).redirect("/login");
      } else {
        // Session
        req.session.userID = user._id;
        return res.status(200).redirect("/users/dashboard");
      }
    }
  } catch (error) {
    req.flash("error", "Something went wrong!");
    return res.status(500).redirect("/login");
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID).populate("courses");
    const categories = await Category.find();
    const courses = await Course.find({ user: user._id });
    const users = await User.find();
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "You are not authorized to access this route.", // daha sonra login page yönlendirmesi yapılabilir.
      });
    }
    return res.status(200).render("dashboard", {
      page_name: "dashboard",
      user,
      categories,
      courses,
      users,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    await Course.deleteMany({ user: id });

    req.flash("info", `${user.name} and related courses deleted successfully.`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
