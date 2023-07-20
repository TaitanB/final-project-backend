const Joi = require("joi");

const {
  passwordRegex,
  phoneRegex,
  birthdayRegex,
  cityRegex,
} = require("../constants/users");

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).regex(passwordRegex).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).regex(passwordRegex).required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  birthday: Joi.string().regex(birthdayRegex),
  phone: Joi.string().regex(phoneRegex),
  city: Joi.string().regex(cityRegex),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
};
