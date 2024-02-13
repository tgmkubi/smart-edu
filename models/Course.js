const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: ["true", "Course name is required"],
  },
  description: {
    type: String,
    required: ["true", "Course description is required"],
    maxLength : [150, "Course description takes max 150 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
