const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  const { name, description, category } = req.body;
  try {
    const course = await Course.create({
      name,
      description,
      category,
    });
    return res.status(201).redirect("/courses");
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  const { category: categorySlug } = req.query;
  const search = req.query.search || req.query["search-k"];

  try {
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {}; // http://localhost:3000/courses?category=front-end&search=html
    if (categorySlug) {
      filter = { category: category._id };
    }

    if (search) {
      filter.name = { $regex: new RegExp(search, "i") }; // "i" parametresi büyük-küçük harf duyarsız arama yapar
    }

    const courses = await Course.find(filter).sort("-createdAt");
    const categories = await Category.find();

    if (!courses) {
      return res.status(500).json({
        status: "fail",
        message: "Internal server error. Please try again later.",
      });
    }
    return res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
exports.getSingleCourse = async (req, res) => {
  const { slug } = req.params;

  try {
    const course = await Course.findOne({ slug: slug });
    if (!course) {
      return res.status(500).json({
        status: "fail",
        message: "Internal server error. Please try again later.",
      });
    }
    return res.status(200).render("course", {
      course,
      page_name: "courses",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
