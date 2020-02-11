var express = require("express");
var router = express.Router();
var Validator = require("validator");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

function validateInput(data) {
  let errors = {};

  if (Validator.isNull(data.username)) {
    errors.username = "please provide a username";
  }
  if (Validator.isNull(data.password)) {
    errors.password = "please provide a password";
  }
  if (Validator.isNull(data.passwordConfirmation)) {
    errors.passwordConfirmation = "please provide a passwordConfirmation";
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

router.post("/", (req, res) => {
  var { errors, isValid } = validateInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }
  console.log(req.body);
});

module.exports = router;
