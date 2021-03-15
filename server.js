//          Dependencies
// Express
const express = require("express");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const path = require("path");
const auth = require("express-openid-connect");
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

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'logged in': 'logged out');
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


