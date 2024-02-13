const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const routers = require('./routers/index');

// EJS TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public")));

// ROUTERS 
app.use('/', routers);

app.listen(PORT, () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
