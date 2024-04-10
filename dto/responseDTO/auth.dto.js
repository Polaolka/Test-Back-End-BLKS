const Joi = require('joi');
const { ERROR_DTO_PATTERNS } = require('../../constants');
const {
  AUTH_FIELDS_REFS: {
    _id,
    name,
    email,
    accessToken,
    refreshToken,
  },
} = require('../commonFieldsRefs');

// create user
const createUserRespDTO = Joi.object({
  _id: _id.required(),
  name: name.required(),
  email: email.required(),
  accessToken: accessToken.required(),
  refreshToken: refreshToken.required(),
}).messages(ERROR_DTO_PATTERNS);

// get all users
const getAllUsersRespDTO = Joi.array().items(createUserRespDTO);

module.exports = { createUserRespDTO, getAllUsersRespDTO};