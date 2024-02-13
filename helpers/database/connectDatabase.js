const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/smartedu");
    console.log("MongoDB Connection Successful...");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connectDatabase;