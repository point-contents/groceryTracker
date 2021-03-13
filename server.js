//          Dependencies
// Express
const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");
const basicAuth = require("express-basic-auth");

//instantiate the "server"
const app = express();

//for parsing the requests
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//for super simple authentication
app.use(basicAuth({
  users: { 'ariki': 'excellentexcellent',
           'joy': 'wonderfulwonderful'},
  challenge: true
}));

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
var grocery = require("./routes/grocery");
var work = require("./routes/workTransaction");
var misc = require("./routes/misc");

//routes with chart.js
var groceryGraph = require("./routes/graph");
var miscGraph = require("./routes/graph");
var workGraph = require("./routes/graph");

app.use("/", home);
app.use("/grocery", grocery);
app.use("/work", work);
app.use("/misc", misc);

app.use("/grocerygraph", groceryGraph);
app.use("/workgraph", workGraph);
app.use("/miscgraph", miscGraph);

//Server Configs
const PORT = 8080;
const hostname = "localhost";

app.listen(PORT, () => {
  console.log(`server running at http://${hostname} on ${PORT}`);
});


