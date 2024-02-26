const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  const { name, description, category } = req.body;
  const { userID: user } = req.session;
  try {
    const course = await Course.create({
      name,
      description,
      category,
      user,
    });
    req.flash("success", `${course.name} has been created successfully.`);
    return res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("error", "Something went wrong! Please try again.");
    return res.status(400).redirect("/courses");
  }
};

exports.getAllCourses = async (req, res) => {
  const { category: categorySlug } = req.query;
  const { search } = req.query;

  try {
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {}; // http://localhost:3000/courses?category=front-end&search=html
    if (categorySlug) {
      filter = { category: category._id };
    }

    if (search) {
      filter.name = { $regex: new RegExp(search, "i") }; // "i" parametresi büyük-küçük harf duyarsız arama yapar
    }

    const courses = await Course.find(filter)
      .sort("-createdAt")
      .populate("user");
    const categories = await Category.find();

    if (!courses) {
      return res.status(500).json({
        status: "fail",
        message: "Internal server error. Please try again later.",
      });
    }
    return res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getSingleCourse = async (req, res) => {
  const { userID } = req.session;
  const { slug } = req.params;

  try {
    const course = await Course.findOne({ slug: slug }).populate("user");
    const user = await User.findById(userID);
    const categories = await Category.find();
    if (!course) {
      return res.status(500).json({
        status: "fail",
        message: "Internal server error. Please try again later.",
      });
    }
    return res.status(200).render("course", {
      course,
      user,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  const { userID } = req.session;
  const { course_id } = req.body;

  try {
    const user = await User.findById(userID);
    // user.courses.push({ _id: course_id });
    user.courses.push(course_id);
    await user.save();

    return res.status(200).redirect("/users/dashboard");
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  const { userID } = req.session;
  const { course_id } = req.body;

  try {
    const user = await User.findById(userID);
    await user.courses.pull(course_id);
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug });
    await course.deleteOne();

    req.flash("error", `${course.name} has been removed successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


exports.updateCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug });
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    await course.save();

    req.flash("success", `${course.name} has been updated successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};