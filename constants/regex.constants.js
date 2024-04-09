const REGULAR_EXPRESSIONS = {
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //   (min 6)  1, a, A, @
  PASSWORD_REGEX:
  /^.{4,}$/,
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*[\s.,\/]).{6,}$/,
  NAME_REGEX: /^[A-Za-z]+(?: [A-Za-z]+)?$/,
};

module.exports = REGULAR_EXPRESSIONS;
