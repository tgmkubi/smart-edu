require("dotenv").config();
const express = require("express");
const path = require("path");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");

const app = express();

const PORT = process.env.PORT || 3000;

connectDatabase();

// EJS TEMPLATE ENGINE
app.set("view engine", "ejs");

// Global Variable
global.userIN = null;

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public"))); // To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: "kubis magic is houdini",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// ROUTERS
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", routers);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
