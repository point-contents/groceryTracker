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

//need to make a route for all of these assets
//ill write them here for now, and then push them out
//to their own file later

//auth0 callback url
app.get("/callback", (req, res) => {
  res.redirect("/home");
})

//for serving the logo to various providors
app.get("/logo", (req, res) => {
  res.sendFile(__dirname + "/public/logo.png");
});

app.get("/", (req, res) => {
    res.render("pages/landingPage.ejs");
});


app.get("/assets/fontawesome", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/assets/css/fontawesome-all.min.css");
});

app.get("/images/bg.png", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/images/bg.jpeg");
});

app.get("/images/overlay.png", (req, res) => {
  res.sendFile(__dirname + "/public/landingPage/images/overlay.png");
});

app.use("/home", home);
app.use("/grocery", grocery);
app.use("/work", work);
app.use("/misc", misc);

app.use("/groceryGraph", groceryGraph);
app.use("/workGraph", workGraph);
app.use("/miscGraph", miscGraph);

const PORT = 8080;
const hostname = "localhost";

app.listen(PORT, () => {
  console.log(`server running at http://${hostname} on ${PORT}`);
});


