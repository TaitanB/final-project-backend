const Joi = require("joi");

const { passwordRegex } = require("../constants/users");

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).regex(passwordRegex).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).regex(passwordRegex).required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
};
