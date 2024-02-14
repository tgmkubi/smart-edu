const express = require("express");
const {
  getIndexPage,
  getAboutPage,
  getDashboardPage,
  getContactPage,
  getRegisterPage,
} = require("../controllers/pageControllers");
const course = require("./course");
const category = require("./category");
const user = require("./user");

const router = express.Router();

router.get("", getIndexPage);
router.get("/about", getAboutPage);
router.get("/dashboard", getDashboardPage);
router.get("/contact", getContactPage);
router.get("/register", getRegisterPage);

router.use("/courses", course);
router.use("/categories", category);
router.use("/users", user);

module.exports = router;
