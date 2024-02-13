const express = require("express");
const { getCoursesPage } = require("../controllers/pageControllers");
const { createCourse } = require("../controllers/courseController");
const course = express.Router();

course.get("", getCoursesPage);
course.post("/add", createCourse);

module.exports = course;
