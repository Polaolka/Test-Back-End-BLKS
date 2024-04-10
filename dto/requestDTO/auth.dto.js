const Joi = require('joi');
const { ERROR_DTO_PATTERNS } = require('../../constants');
const {
  AUTH_FIELDS_REFS: { name, email, id, refreshToken, html },
} = require('../commonFieldsRefs');

// create user
const createUserDTO = Joi.object()
  .keys({
    name: name.required(),
    email: email.required(),
  })
  .messages(ERROR_DTO_PATTERNS);

// get current user
const getCurrentUserDTO = Joi.object()
  .keys({
    id: id.required(),
  })
  .messages(ERROR_DTO_PATTERNS);

  // refresh user
const refreshUserDTO = Joi.object()
.keys({
  refreshToken: refreshToken.required(),
})
.messages(ERROR_DTO_PATTERNS);

  // refresh user
  const logoutUserDTO = Joi.object()
  .keys({
    id: id.required(),
  })
  .messages(ERROR_DTO_PATTERNS);

module.exports = {
  createUserDTO,
  getCurrentUserDTO,
  refreshUserDTO,
  logoutUserDTO
};
