const { Schema, model } = require('mongoose');

const Joi = require('joi');

const {
  REGULAR_EXPRESSIONS: { EMAIL_REGEX, NAME_REGEX },
} = require('../constants');
const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name'],
      minlength: 1,
      maxlength: 30,
    },
    password: {
      type: String,
      required: [true, 'Set password'],
      minlength: 6,
      // match: passRegex,
    },
    email: {
      type: String,
      required: [true, 'Set Email'],
      unique: true,
      match: EMAIL_REGEX,
    },
    accessToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().pattern(NAME_REGEX).min(2).max(30).required().messages({
    'string.base': 'The name must be a string.',
    'string.pattern': 'The password must be a valid password.',
    'string.min': 'The name must be at least 2.',
    'string.max': 'The name cannot exceed 30.',
    'any.required': 'The name field is required.',
  }),
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    'string.base': 'The email must be a string.',
    'string.pattern': 'The email must be a valid email address.',
    'any.required': 'The email field is required.',
  }),
  password: Joi.string().min(6).max(16).required().messages({
    'string.base': 'The password must be a string.',
    'string.min': 'The password must be at least 6.',
    'string.max': 'The password cannot exceed 16.',
    'any.required': 'The password field is required.',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    'string.base': 'The email must be a string.',
    'string.pattern': 'The email must be a valid email address.',
    'any.required': 'The email field is required.',
  }),
  password: Joi.string().min(6).max(16).required().messages({
    'string.base': 'The password must be a string.',
    'string.min': 'The password must be at least 6.',
    'string.max': 'The password cannot exceed 16.',
    'any.required': 'The password field is required.',
  }),
});


const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
