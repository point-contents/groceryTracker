// Validation Rules

var { check } = require('express-validator');

let getValidate = [
  check('body')
    .isEmpty()
]

module.exports = getValidate;
