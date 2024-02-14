const User = require("../models/User");
const { comparePassword } = require("../helpers/input/inputHelpers");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json({
      status: "success",
      user,
    });
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

    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
