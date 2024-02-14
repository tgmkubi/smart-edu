const mongoose = require("mongoose");
const slugify = require("slugify");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: ["true", "Course name is required"],
  },
  description: {
    type: String,
    required: ["true", "Course description is required"],
    maxLength: [150, "Course description takes max 150 characters"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
});

courseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
