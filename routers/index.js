const express = require("express");
const {
  getIndexPage,
  getAboutPage,
  getDashboardPage,
  getContactPage,
} = require("../controllers/pageControllers");
const course = require("./course");

const router = express.Router();

router.get("", getIndexPage);
router.get("/about", getAboutPage);
router.get("/dashboard", getDashboardPage);
router.get("/contact", getContactPage);

router.use("/courses", course);

module.exports = router;
