const bcrypt = require("bcrypt");

const comparePassword = async (res, next, password, passwordHash) => {
  try {
    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
      return next();
    } else {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = {
  comparePassword,
};
