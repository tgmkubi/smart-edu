const express = require("express");
const {
    createCategory
} = require("../controllers/categoryController");
const category = express.Router();

category.post("/", createCategory);

module.exports = category;
