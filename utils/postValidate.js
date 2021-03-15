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
]

module.exports = postValidate;
