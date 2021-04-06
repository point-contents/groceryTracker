/// endpoint to post transactions made during work

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const { check, body, validationResult } = require("express-validator");
const { auth, requiresAuth } = require("express-openid-connect");

var getValidate = require("../../utils/getValidate");
var postValidate = require("../../utils/postValidate");
var postWorkValidate = require("../../utils/postValidate");
var workTransaction = require("../../model/workTransactionModel");

//ROUTES
router.get("/", getValidate, requiresAuth(), (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    //JSON like structure are the values that area passed to the
    //template, should be the same for all of the views that are
    //for posting to the database.
    res.render("pages/postView.ejs",
      {
        maxValue: 50,
        minValue: 0,
        formPostAction: "work",
        graphPostAction: "workGraph"
      });
  } else {
    console.log("Bad get request");
    console.log(errors);
    res.send("Bad request");
  }
});

router.post("/", postValidate, postWorkValidate, requiresAuth(), (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const sub = req.oidc.user.sub;
    try {
      workTransaction.insertMany([
        {
          date: Date.now(),
          amount: req.body.value,
          userID: sub 
        },
      ]);
    } catch (err) {
      console.error("Error inserting into DB");
      console.error(err);
    }
    res.redirect("/work");
  } else {
    console.log("Failed Validator");
    console.error(errors);
    res.send("Bad Request");
  }
});

module.exports = router;
