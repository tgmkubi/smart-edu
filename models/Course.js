const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require("./User");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: ["true", "Course name is required"],
  },
  description: {
    type: String,
    required: ["true", "Course description is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

courseSchema.post("deleteOne", { document: true, query: false }, async function () {
  const deletedCourse = this;

  try {
    // Kursu silindiği için bağlı olduğu kullanıcıları bul
    const users = await User.find({ courses: deletedCourse._id });

    // Her kullanıcı için ilgili kursu courses dizisinden kaldır
    await Promise.all(
      users.map(async (user) => {
        user.courses.pull(deletedCourse._id);
        await user.save();
      })
    );

    console.log("Kurs bağlantıları başarıyla güncellendi.");
  } catch (error) {
    console.error("Kurs bağlantılarını güncellemede bir hata oluştu:", error);
  }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
