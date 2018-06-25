const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateNoticeInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.title, { min: 3, max: 40 })) {
    errors.title = "Post must be between 3 and 40 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 3000 })) {
    errors.text = "Post must be between 10 and 3000 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
