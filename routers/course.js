const express = require("express");
const { getAccessToRoute } = require("../middlewares/auth");
const {
  createCourse,
  getAllCourses,
  getSingleCourse,
} = require("../controllers/courseController");
const course = express.Router();

// course.get("", getCoursesPage);
course.get("/", getAllCourses);
course.post("/", getAccessToRoute(["teacher", "admin"]), createCourse);
course.get("/:slug", getSingleCourse);

module.exports = course;
