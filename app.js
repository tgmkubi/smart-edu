const express = require("express");
const path = require("path");
const PORT = 3000;
const routers = require('./routers/index');
const connectDatabase = require("./helpers/database/connectDatabase");

const app = express();

connectDatabase();

// EJS TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// ROUTERS 
app.use('', routers);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
