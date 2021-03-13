// endpoint to post transactions made during work

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const { check, body, validationResult } = require("express-validator");

var getValidate = require("../utils/getValidate");
var postValidate = require("../utils/postValidate");
var workTransaction = require("../model/workTransactionModel");

//ROUTES
router.get("/", getValidate, (req, res) => {
  console.log("Request to home");
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    res.render("pages/work-transaction-index.ejs");
  } else {
    console.log("Bad get request");
    console.log(errors);
    res.send("Bad request");
  }
});

router.post("/", postValidate, (req, res) => {
  console.log("Post attempt made");
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log("Passed Validator");
    console.log(req.body);
    try {
      workTransaction.insertMany([
        {
          date: Date.now(),
          amount: req.body.value,
          transactionType: "Work Lunches" 
        },
      ]);
    } catch (err) {
      console.log("Error inserting into DB");
      console.err(err);
    }
    res.redirect("/work");
  } else {
    console.log("Failed Validator");
    console.log(req.body);
    console.log(errors);
    res.send("Bad Request");
  }
});

module.exports = router;
