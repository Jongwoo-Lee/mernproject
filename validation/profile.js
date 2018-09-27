const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  //data.mainposition = !isEmpty(data.mainposition) ? data.mainposition : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Username must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "이름을 입력해주세요";
  }

  if (!Validator.isLength(data.handle, { min: 1, max: 5 })) {
    errors.handle = "Back number needs to be between 1 and 5 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Back number is required";
  }

  if (!Validator.isNumeric(data.handle)) {
    errors.handle = "숫자를 입력해주세요";
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
