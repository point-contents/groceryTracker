// post validator

var { check } = require('express-validator');

let postValidate = [
  check('value')
      .trim()
      .escape()
      .toInt()
      .notEmpty()
      .exists()
      .isInt()
      .isLength({max: 3})
      .isNumeric({min: 1, max: 200})
]

let postGroceryValidate = [
    check('value')
      .isNumeric({min: 1, max: 200})
]

let postWorkValidate = [
    check('value')
      .isNumeric({min: 1, max: 50})
]

let postMiscValidate = [
    check('value')
      .isNumeric({min: 1, max: 50})
]
module.exports = postValidate;
