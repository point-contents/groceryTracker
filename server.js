//          Dependencies
// Express
const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
});
app.use(limiter);
app.set("trust proxy", 1);

//to render templates
app.set("view-engine", "ejs");
app.use(express.static("public"));

//ROUTES
var home = require("./routes/home");
var transaction = require("./routes/transaction");
var graph = require("./routes/graph");

app.use("/", home);
app.use("/transaction", transaction);
app.use("/graph", graph);

//Server Configs
const PORT = 8080;
const hostname = "localhost";

app.listen(PORT, () => {
  console.log(`server running at http://${hostname} on ${PORT}`);
});


