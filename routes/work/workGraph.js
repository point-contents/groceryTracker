const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
var getValidate = require("../../utils/getValidate");

//DATABASE MODEL
var workModel = require('../../model/workTransactionModel');

router.get("/", getValidate, (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) 
  {
    var transactionList = {
      _id: false,
      __v: false,
      transactionType: false
    };

    workModel.find({}, transactionList, (err, data) => 
    {
      if(err) 
      {
          res.send("error");
          console.log("Error seaching database");
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
      res.render("pages/work/workGraph.ejs", {
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
