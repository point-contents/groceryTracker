// endpoint to post grocery transactions

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//does this need to be here??
const { check, body, validationResult } = require("express-validator");
var getValidate = require("../../utils/getValidate");
var postValidate = require("../../utils/postValidate");
var postGroceryValidate = require("../../utils/postValidate");
var groceryModel = require("../../model/groceryTransactionModel");

//auth0 middleware
const { auth, requiresAuth } = require("express-openid-connect");

//instantiates the router object that is later
//used by the server object
const router = express.Router();

router.get("/", getValidate, requiresAuth(), (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    //JSON like structure are the values that area passed to the
    //template, should be the same for all of the views that are
    //for posting to the database.
    res.render("pages/postView.ejs",
      {
        maxValue: 200,
        minValue: 0,
        formPostAction: "grocery",
        graphPostAction: "groceryGraph"
      });
  } else {
    res.status(400).send({success: false});
    console.error(errors);
  }
});

router.post("/", postValidate, postGroceryValidate, requiresAuth(), (req, res) => {
  const errors = validationResult(req);
  const sub = req.oidc.user.sub;
  if (errors.isEmpty()) {
    try {
      groceryModel.insertMany([
        {
          date: Date.now(),
          amount: req.body.value,
          userID: sub,
        },
      ]);
    } catch (err) {
      res.status(400).send({success: false});
    }
    res.redirect("/grocery");
  } else {
     res.status(400).send({success: false});
  }
});

module.exports = router;
