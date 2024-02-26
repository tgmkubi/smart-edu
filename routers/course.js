const express = require("express");
const { getAccessToRoute } = require("../middlewares/auth");
const {
  createCourse,
  getAllCourses,
  getSingleCourse,
  enrollCourse,
  releaseCourse,
  deleteCourse,
} = require("../controllers/courseController");
const course = express.Router();

// course.get("", getCoursesPage);
course.get("/", getAllCourses);
course.post("/", getAccessToRoute(["teacher", "admin"]), createCourse);
course.get("/:slug", getSingleCourse);
course.post("/enroll", enrollCourse);
course.post("/release", releaseCourse);
course.delete("/:slug", deleteCourse);

module.exports = course;
