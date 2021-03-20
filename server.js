//////////////////////////////////////////////////
//          Dependencies
//////////////////////////////////////////////////

//dotenv for dev, probs way better than waiting ages
//for digital ocean to fail
require("dotenv").config();

// Express
const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan"); //simple logging

// Auth auth0 settings and package
const { auth, requiresAuth } = require("express-openid-connect");
const authConfig = require("./utils/authConfig");

//////////////////////////////////////////////////
//        This is the start of the Server
//////////////////////////////////////////////////
  
//instantiate the "server"
const app = express();

// Server Configs

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

//probably a fair bit higher than it needs to be for now
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
});
app.use(limiter);
app.set("trust proxy", 1);

//Auth config provided by Auth0, config imported from its
//own file
app.use(auth(authConfig));

//log requests to STDOUT with Apache style logging
app.use(morgan('combined'));


//////////////////////////////////////////////////
//                  ROUTES                      //
//////////////////////////////////////////////////

//unathenticated route
//to home, entry point
app.get("/", (req, res) => {
    res.render("pages/landingPage.ejs");
});

var home = require("./routes/home");
var grocery = require("./routes/grocery/grocery");
var work = require("./routes/work/workTransaction");
var misc = require("./routes/misc/misc");

//routes with chart.js
var groceryGraph = require("./routes/grocery/groceryGraph");
var miscGraph = require("./routes/misc/miscGraph");
var workGraph = require("./routes/work/workGraph");

app.use("/home", home);
app.use("/grocery", grocery);
app.use("/work", work);
app.use("/misc", misc);

app.use("/groceryGraph", groceryGraph);
app.use("/workGraph", workGraph);
app.use("/miscGraph", miscGraph);

//TODO FIX, this is just here to get the auth working,
//obviously they will need to go later.

//auth0 callback url
app.get("/callback", (req, res) => {
  res.redirect("/home");
})

//need to make a route for all of these assets
//ill write them here for now, and then push them out
//to their own file later

//for serving the logo and favicon to various providers
app.get("/logo", (req, res) => {
  res.sendFile(__dirname + "/public/logo.png");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/public/favicon.ico");
});

//the following are things that the HTML5UP
//landing page was wanting to serve as static assets
//to load the animations and etc
app.get("/assets/fontawesome", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/css/fontawesome-all.min.css");
});

app.get("/public/landingPage/images/pic02.jpg", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/images/pic02.jpg");
});

app.get("/public/landingPage/images/pic02.jpg", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/images/pic03.jpg");
});

app.get("/images/bg.jpg", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/images/bg.jpg");
});

app.get("/images/overlay.png", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/images/overlay.png");
});

const PORT = 8080;
const hostname = "localhost";

app.listen(PORT, () => {
  console.log(`server running at http://${hostname} on ${PORT}`);
});


