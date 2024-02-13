const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const { name, description } = req.body;
  try {
    const course = await Course.create({
      name,
      description,
    });
    return res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort("-createdAt");
    if (!courses) {
      return res.status(500).json({
        status: "fail",
        message: "Internal server error. Please try again later.",
      });
    }
    return res.status(200).render("courses", {
      courses,
      page_name: "courses",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
