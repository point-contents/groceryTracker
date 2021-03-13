// endpoint to post grocery transactions

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//does this need to be here??
const { check, body, validationResult } = require("express-validator");
var getValidate = require("../utils/getValidate");
var postValidate = require("../utils/postValidate");
var groceryModel = require("../model/groceryTransactionModel");

const router = express.Router();

router.get("/", getValidate, (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    res.render("pages/old-index.ejs").status(200);
  } else {
    res.send("Bad request").res.status(404);
    console.log(errors);
  }
});

router.post("/", postValidate, (req, res) => {
  console.log("Post attempt made");
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    console.log("Passed Validator");
    console.log(req.body);
    try {
      groceryModel.insertMany([
        {
          date: Date.now(),
          amount: req.body.value,
          transactionType: req.body.item,
        },
      ]);
    } catch (err) {
      console.log("Error inserting into DB");
      console.err(err);
    }
    res.redirect("/");
  } else {
    console.log("Failed Validator");
    console.log(req.body);
    console.log(errors);
    res.send("Bad Request").status(404);
  }
});

module.exports = router;
