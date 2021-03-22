// home route
const express = require('express');
const { check, body, validationResult } = require('express-validator');
const getValidate = require('../utils/getValidate');
const { requiresAuth } = require("express-openid-connect")

//instantiate router object
const router = express.Router();

//ROUTES
router.get("/", getValidate, requiresAuth(),
  (req, res) => {
  const errors = validationResult(req);
  if(errors.isEmpty())
  {  
    res.render("pages/index.ejs");
  }
  else
  {
    console.log(errors);
    res.send("Bad request");
  }
});

module.exports = router;
