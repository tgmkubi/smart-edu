const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) return res.redirect("/login");
  next();
};

const redirectMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (user) return res.redirect("/");
  next();
};

module.exports = {
  authMiddleware,
  redirectMiddleware,
};
