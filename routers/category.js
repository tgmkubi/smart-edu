const express = require("express");
const {
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");
const category = express.Router();

category.post("/", createCategory);
category.put("/:slug", updateCategory);
category.delete("/:id", deleteCategory);

module.exports = category;
