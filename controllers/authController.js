const User = require("../models/User");
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
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    await comparePassword(res, next, password, user.password);

    // Session
    req.session.userID = user._id;

    return res.status(200).redirect("/users/dashboard");
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "You are not authorized to access this route.", // daha sonra login page yönlendirmesi yapılabilir.
      });
    }
    return res.status(200).render("dashboard", {
      page_name: "dashboard",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
