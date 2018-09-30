const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNoticeInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, { min: 5, max: 40 })) {
    errors.title = "Post must be between 5 and 40 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
