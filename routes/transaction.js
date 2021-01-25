// endpoint to post transactions 

const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const { check, body, validationResult } = require("express-validator");

var postValidate = require("../utils/postValidate");
var groceryModel = require("../model/transactionModel");

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
