const express = require("express");
const { redirectMiddleware } = require("../middlewares/auth");
const {
  getIndexPage,
  getAboutPage,
  getContactPage,
  getRegisterPage,
  getLoginPage,
} = require("../controllers/pageControllers");
const course = require("./course");
const category = require("./category");
const user = require("./user");

const router = express.Router();

router.get("/", getIndexPage);
router.get("/about", getAboutPage);
router.get("/contact", getContactPage);
router.get("/register", redirectMiddleware, getRegisterPage);
router.get("/login", redirectMiddleware, getLoginPage);

router.use("/courses", course);
router.use("/categories", category);
router.use("/users", user);

module.exports = router;
