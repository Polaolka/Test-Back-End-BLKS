const Joi = require('joi');
const { ERROR_DTO_PATTERNS } = require('../../constants');
const {
  AUTH_FIELDS_REFS: {
    _id,
    name,
    email,
    accessToken,
    refreshToken,
    message
  },
} = require('../commonFieldsRefs');

// create user
const getCurrentUserRespDTO = Joi.object({
  _id: _id.required(),
  name: name.required(),
  email: email.required(),
  accessToken: accessToken.required(),
  refreshToken: refreshToken.required(),
}).messages(ERROR_DTO_PATTERNS);

const getUserRespDTO = Joi.object({
  _id: _id.required(),
  name: name.required(),
  email: email.required(),
  accessToken: accessToken.required(),
  refreshToken: refreshToken.required(),
}).messages(ERROR_DTO_PATTERNS);

// get all users
const getAllUsersRespDTO = Joi.array().items(getUserRespDTO);

// google callback
const googleCallbackRespDTO = Joi.object({
  accessToken: accessToken.required(),
  refreshToken: refreshToken.required(),
}).messages(ERROR_DTO_PATTERNS);

// user logout
const userLogoutRespDTO = Joi.object({
  message: message.required(),
}).messages(ERROR_DTO_PATTERNS);
module.exports = { getCurrentUserRespDTO, getAllUsersRespDTO, googleCallbackRespDTO, userLogoutRespDTO, getUserRespDTO};