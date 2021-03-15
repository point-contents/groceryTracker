// endpoint to post misc transactions

const express = require("express");
const path = require("path");
const { check, body, validationResult } = require("express-validator");
var postValidate = require("../../utils/postValidate");
var getValidate = require("../../utils/getValidate");
var miscTransaction = require("../../model/miscTransactionModel");

const router = express.Router();
// ROUTES

router.get("/", getValidate, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    res.render("pages/misc-index.ejs");
  } else {
    res.send("It didnt work");
  }
});

router.post("/", postValidate, (req, res) => {
  console.log("Post attempt made");
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log("Passed Validator");
    console.log(req.body);
    try {
      miscTransaction.insertMany([
        {
          date: Date.now(),
          amount: req.body.value,
          transactionType: "Misc Spending",
        },
      ]);
    } catch (err) {
      console.log("Error inserting into DB");
      console.err(err);
    }
    res.redirect("/misc");
  } else {
    console.log("Failed Validator");
    console.log(req.body);
    console.log(errors);
    res.send("Bad Request");
  }
});

module.exports = router;
