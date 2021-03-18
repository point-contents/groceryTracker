const express = require("express");
const path = require("path");
const { check, body, validationResult } = require("express-validator");
const { auth, requiresAuth } = require("express-openid-connect");
var getValidate = require("../../utils/getValidate");

//DATABASE MODEL
var workModel = require('../../model/workTransactionModel');

const router = express.Router();

router.get("/", getValidate, requiresAuth(), (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty()) 
  {
    var transactionList = {
      _id: false,
      __v: false,
      transactionType: false
    };

    const sub = req.oidc.user.sub;
    workModel.find({ userID: sub }, transactionList, (err, data) => 
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
