const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: ["true", "Course name is required"],
  },
  slug: {
    type: String,
    unique: true,
  },
});

categorySchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
