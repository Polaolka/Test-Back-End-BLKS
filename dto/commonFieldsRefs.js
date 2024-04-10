const Joi = require('joi').extend(require('@joi/date'));

const {
  REGULAR_EXPRESSIONS,
} = require('../constants');
// ==== COMMON REFS ====
// ____AUTH_FIELDS_REFS____

const AUTH_FIELDS_REFS = {
  _id: Joi.any(),
  name: Joi.string().min(2).max(100).regex(REGULAR_EXPRESSIONS.NAME_REGEX),
  email: Joi.string().regex(REGULAR_EXPRESSIONS.EMAIL_REGEX),
  password: Joi.string().min(4).regex(REGULAR_EXPRESSIONS.PASSWORD_REGEX),
  accessToken: Joi.string(),
  refreshToken: Joi.string(),
};
// ==== ==== ==== ==== ==== ==== ==== ==== ==== ====

module.exports = { AUTH_FIELDS_REFS };
