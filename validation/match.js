const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMatchInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.title)) {
    errors.title = "제목을 입력해주세요";
  }

  if (Validator.isEmpty(data.place)) {
    errors.place = "장소를 입력해주세요";
  }

  if (Validator.isEmpty(data.start)) {
    errors.start = "시간을 입력해주세요";
  }

  if (Validator.isEmpty(data.end)) {
    errors.end = "시간을 입력해주세요";
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "모임종류를 선택해주세요";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
