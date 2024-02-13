const express = require("express");
const {
  getIndexPage,
  getAboutPage,
  getCoursesPage,
  getDashboardPage,
  getContactPage,
} = require("../controllers/pageControllers");

const router = express.Router();

router.get("", getIndexPage);
router.get("/about", getAboutPage);
router.get("/courses", getCoursesPage);
router.get("/dashboard", getDashboardPage);
router.get("/contact", getContactPage);

module.exports = router;