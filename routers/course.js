const express = require("express");
const {
  createCourse,
  getAllCourses,
  getSingleCourse,
} = require("../controllers/courseController");
const course = express.Router();

// course.get("", getCoursesPage);
course.get("/", getAllCourses);
course.post("/", createCourse);
course.get("/:slug", getSingleCourse);

module.exports = course;
