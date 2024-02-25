const bcrypt = require("bcrypt");

const comparePassword = async (password, passwordHash) => {
  const match = await bcrypt.compare(password, passwordHash);
  if (match) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  comparePassword,
};
