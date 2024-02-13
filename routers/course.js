const express = require("express");
const {
  createCourse,
  getAllCourses,
} = require("../controllers/courseController");
const course = express.Router();

// course.get("", getCoursesPage);
course.get("", getAllCourses);
course.post("", createCourse);

module.exports = course;
