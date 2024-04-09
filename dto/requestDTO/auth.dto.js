const Joi = require('joi');
const { ERROR_DTO_PATTERNS } = require('../../constants');
const {
  AUTH_FIELDS_REFS: {
    name,
    email,
    subject,
    text,
    html,
  },
} = require('../commonFieldsRefs');

// create user
const createUserDTO = Joi.object()
  .keys({
    name: name.required(),
    email: email.required(),
  })
  .messages(ERROR_DTO_PATTERNS);

module.exports = {
  createUserDTO
};
