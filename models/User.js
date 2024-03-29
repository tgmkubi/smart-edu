const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Course = require("./Course");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["true", "User name is required"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const saltRounds = 10; // rounds=10: ~10 hashes/sec
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    this.password = hash;
    next();
  });
});

// userSchema.pre("deleteOne", async function (next) {
//   const userId = this._id; // Accessing _id directly from the document
//   console.log(userId);
//   console.log("deleteOne tetiklendi")
//   try {
//       await Course.deleteMany({ user: userId });
//       console.log("Related courses deleted successfully.");
//       next();
//   } catch (error) {
//       console.error("Failed to delete related courses:", error);
//       next(error);
//   }
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
