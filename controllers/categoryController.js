const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({
      name,
    });
    return res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
