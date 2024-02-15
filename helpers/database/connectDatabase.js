const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connection Successful...");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectDatabase;
