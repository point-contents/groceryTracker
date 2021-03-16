const express = require("express");
const { check, body, validationResult } = require("express-validator");
//const { auth, authRequired } = require("express-openid-connect");
var getValidate = require("../../utils/getValidate");

//DATABASE MODEL
var miscModel = require('../../model/miscTransactionModel');

const router = express.Router();

router.get("/", getValidate, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) 
  {
    var transactionList = {
      _id: false,
      __v: false,
      transactionType: false
    };

    miscModel.find({}, transactionList, (err, data) => 
    {
      if(err) 
      {
          res.send("error");
          console.log("Error searching Database");
          console.log(err);
      }
      else 
      {
      let spendingDataDate = [];
      let spendingDataAmount = [];
      data.forEach((element) => {
        spendingDataDate.push(element.date.toDateString());
        spendingDataAmount.push(element.amount);
      });
      res.render("pages/misc/miscGraph.ejs", {
        date: spendingDataDate,
        data: spendingDataAmount})
        }
    })
  }
  else {
    res.send("bad request");
  }
});


module.exports = router;
