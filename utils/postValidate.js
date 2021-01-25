// post validator

var { check } = require('express-validator');


let postValidate = [
  check('item')
      .trim()
      .escape()
      .notEmpty()
      .exists()
      .isString(),
  check('value')
      .trim()
      .escape()
      .toInt()
      .notEmpty()
      .exists()
      .isInt()
      .isLength({max: 3})
]

module.exports = postValidate;
