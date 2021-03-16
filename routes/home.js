// home route

const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator');
const getValidate = require('../utils/getValidate');
const { requiresAuth } = require("express-openid-connect")

//ROUTES
router.get("/", getValidate, requiresAuth(),
  (req, res) => {
  console.log("Request to home");
  const errors = validationResult(req);
  if(errors.isEmpty())
  {  
    res.render("pages/index.ejs");
  }
  else
  {
    console.log("Bad get request");
    console.log(errors);
    res.send("Bad request");
  }
});

module.exports = router;
