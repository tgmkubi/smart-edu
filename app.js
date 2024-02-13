const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const { 
  getHomePage,
  getAboutPage,
  getCoursesPage,
  getDashboardPage,
  getContactPage,
 } = require("./controllers/pageControllers");

// EJS TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public")));

app.get("/", getHomePage);

app.get("/about", getAboutPage);

app.get("/courses", getCoursesPage);

app.get("/dashboard", getDashboardPage);

app.get("/contact", getContactPage);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
