//          Dependencies
// Express
const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");
const { auth, requiresAuth } = require("express-openid-connect");
const authConfig = require("./utils/authConfig");

//instantiate the "server"
const app = express();

//to render templates apparently having it up higher
//can make it faster serving public files.
app.use(express.static("public"));
app.set("view-engine", "ejs");

//for parsing the requests
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

//Auth config provided by Auth0
app.use(auth(authConfig));

//ROUTES
var home = require("./routes/home");
var grocery = require("./routes/grocery/grocery");
var work = require("./routes/work/workTransaction");
var misc = require("./routes/misc/misc");

//routes with chart.js
var groceryGraph = require("./routes/grocery/groceryGraph");
var miscGraph = require("./routes/misc/miscGraph");
var workGraph = require("./routes/work/workGraph");

//FIX, this is just here to get the auth working,
//obviously they will need to go later.

app.get("/callback", (req, res) => {
  res.render("home");
})


//for serving the logo to various providors
app.get("/logo", (req, res) => {
  res.sendFile(__dirname + "/public/logo.png");
});

app.get("/", (req, res) => {
  res.render("pages/landingPage.ejs");
});

//need to make a route for all of these assets
//ill write them here for now, and then push them out
//to their own file later

app.get("/assets/fontawesome", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/css/fontawesome-all.min.css");
});

app.get("/assets/webfonts/fa-regular-400.woff", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/webfonts/fa-regular-400.woff");
});

app.get("/assets/webfonts/fa-solid-900", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/webfonts/fa-solid-900");
});

app.get("/assets/webfonts/fa-solid-900.eot", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/webfonts/fa-solid-900.eot");
});

app.get("/assets/webfonts/fa-solid-900.woff2", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/webfonts/fa-solid-900.woff2");
});

app.get("/assets/webfonts/fa-solid-900.woff", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/webfonts/fa-solid-900.woff");
});

app.get("/assets/webfonts/fa-regular-400.ttf", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/webfonts/fa-solid-900.ttf");
});
app.get("/assets/webfonts/fa-solid-900.svg", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/webfonts/fa-solid-900.svg");
});

app.use("/home", home);
app.use("/grocery", grocery);
app.use("/work", work);
app.use("/misc", misc);

app.use("/groceryGraph", groceryGraph);
app.use("/workGraph", workGraph);
app.use("/miscGraph", miscGraph);

//Server Configs
const PORT = 8080;
const hostname = "localhost";

app.listen(PORT, () => {
  console.log(`server running at http://${hostname} on ${PORT}`);
});


