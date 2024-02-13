const express = require("express");
const path = require("path");
const PORT = 3000;
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");

const app = express();

connectDatabase();

// EJS TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public"))); // To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// ROUTERS
app.use("", routers);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
