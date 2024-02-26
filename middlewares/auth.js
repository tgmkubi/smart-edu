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

const getAccessToRoute = (roles) => {
  return async (req, res, next) => {
    const userRole = req.body.role || req.query.role;
    if (roles.includes(userRole)) {
      next();
    } else {
      return res
        .status(401)
        .send("You are not authorize to access this route.");
    }
  };
};

module.exports = {
  authMiddleware,
  redirectMiddleware,
  getAccessToRoute,
};
