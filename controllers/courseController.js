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
