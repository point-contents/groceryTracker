// endpoint to post grocery transactions 

const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
//does this need to be here??
const { check, body, validationResult } = require("express-validator");

var getValidate = require("../utils/getValidate");
var postValidate = require("../utils/postValidate");
var groceryModel = require("../model/transactionModel");

router.get("/", getValidate,
    (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty())
    {
      res.status(200).send("you have made it to the main transaction get page");
      console.log("you have made it to the main transaction get page");
    }
    else
    {
      res.status(404).send("there was an error");
      console.log("there was an error");
    }
});

router.post("/", postValidate,
    (req, res) => {
      console.log("Post attempt made");
      const errors = validationResult(req);
      if(errors.isEmpty())
      {
        console.log("Passed Validator");
        console.log(req.body);
        groceryModel.insertMany(
        [
        {
          date: Date.now(),
          amount: req.body.value,
          transactionType: req.body.item
        }
        ]);
        res.redirect("/");
      }
      else
      {
        console.log("Failed Validator");
        console.log(req.body);
        console.log(errors);
        res.send("Bad Request");
      }
});

module.exports = router;
