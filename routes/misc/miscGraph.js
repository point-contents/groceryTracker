const express = require("express");
const path = require("path");
const { check, body, validationResult } = require("express-validator");
const { auth, requiresAuth } = require("express-openid-connect");

var getValidate = require("../../utils/getValidate");

//DATABASE MODEL
var miscModel = require("../../model/miscTransactionModel");

const router = express.Router();

router.get("/", getValidate, requiresAuth(), (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    var transactionList = {
      //pretty sure this object can be deleted
      _id: false,
      __v: false,
      transactionType: false,
    };
    const sub = req.oidc.user.sub;
    miscModel.find({ userID: sub }, transactionList, (err, data) => {
      if (err) {
        res.send("error");
        console.log("Error searching Database");
        console.log(err);
      } else {
        let spendingDataDate = [];
        let spendingDataAmount = [];
        data.forEach((element) => {
          spendingDataDate.push(element.date.toDateString());
          spendingDataAmount.push(element.amount);
        });
        res.render("pages/misc/miscGraph.ejs", {
          date: spendingDataDate,
          data: spendingDataAmount,
        });
      }
    });
  } else {
    res.send("bad request");
  }
});

module.exports = router;
