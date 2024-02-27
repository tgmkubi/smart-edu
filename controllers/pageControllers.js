const nodemailer = require("nodemailer");
const Course = require("../models/Course");
const User = require("../models/User");

exports.getIndexPage = async (req, res) => {
  console.log(req.session.userID);

  const courses = await Course.find().sort("-createdAt").limit(2);
  const totalCourses = await Course.countDocuments();
  const totalStudents = await User.find({ role: "student" }).countDocuments();
  const totalTeachers = await User.find({ role: "teacher" }).countDocuments();

  res.status(200).render("index", {
    page_name: "index",
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  return res.status(200).render("login", {
    page_name: "login",
  });
};

exports.sendEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // sender address
      to: req.body.email, // list of receivers
      subject: `SMARTEDU CONTACT MESSAGE FROM ${req.body.name}`, // Subject line
      html: `
        <h1>Mail Details</h1>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
        </ul>
        <h1>Message</h1>
        <p> ${req.body.message}</p>
        `,
    });

    req.flash("success", "We've received your message successfully");
    return res.status(200).redirect("/contact");
  } catch (error) {
    req.flash("error", "Something went wrong! Please try again later.");
    return res.status(200).redirect("/contact");
  }
};
