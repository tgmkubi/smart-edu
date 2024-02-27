const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({
      name,
    });

    req.flash("success", `${category.name} has been created successfully`);
    return res.status(200).redirect("/users/dashboard");
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  const { slug } = req.params;

  console.log(slug);
  try {
    const category = await Category.findOne({ slug });

    category.name = name;
    await category.save();

    req.flash("success", `${category.name} has been updated successfully`);
    return res.status(200).redirect("/users/dashboard");
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);

    // category silindiğinde ilgili kurslar silinmesin. category alanı null olarak ayarlansın.
    const courses = await Course.find({ category: id });
    await Promise.all(
      courses.map(async (course) => {
        course.category = null;
        await course.save();
      })
    );

    req.flash("error", `${category.name} has been deleted successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
