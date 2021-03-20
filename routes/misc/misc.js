// endpoint to post misc transactions

const express = require("express");
const path = require("path");
const { check, body, validationResult } = require("express-validator");
const { auth, requiresAuth } = require("express-openid-connect");

var postValidate = require("../../utils/postValidate");
var getValidate = require("../../utils/getValidate");
var miscTransaction = require("../../model/miscTransactionModel");


const router = express.Router();
// ROUTES

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
        formPostAction: "misc",
        graphPostAction: "miscGraph"
      });
  } else {
    res.send("Bad request");
    console.error(errors);
  }
});

router.post("/", postValidate, requiresAuth(), (req, res) => {
  console.log("Post attempt made");
  const errors = validationResult(req);
  //TODO find the best way to this, for example, does it
  //actually need to be its own variable? or just use it directly
  //in the insert statement?
  const sub = req.oidc.user.sub;
  if (errors.isEmpty()) {
    console.log("Passed Validator");
    console.log(req.body);
    try {
      miscTransaction.insertMany([
        {
          date: Date.now(),
          amount: req.body.value,
          userID: sub
        },
      ]);
    } catch (err) {
      console.log("Error inserting into DB");
      console.error(err);
    }
    res.redirect("/misc");
  } else {
    console.log("Failed Validator");
    console.log(req.body);
    console.log(errors);
    //TODO replace this with a 404 type page
    res.send("Bad Request");
  }
});

module.exports = router;
