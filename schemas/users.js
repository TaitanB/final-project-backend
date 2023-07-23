const Joi = require("joi");

const {
  passwordRegex,
  phoneRegex,
  birthdayRegex,
  cityRegex,
} = require("../constants/constants");

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).pattern(passwordRegex).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(16).pattern(passwordRegex).required(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  birthday: Joi.string()
    .pattern(birthdayRegex)
    .message("Invalid birthday format. Please use DD-MM-YYYY")
    .custom((value, helpers) => {
      const [day, month, year] = value.split("-");
      const dateObj = new Date(`${year}-${month}-${day}`);

      if (isNaN(dateObj.getTime())) {
        return helpers.error("any.invalid");
      }

      const isValidDate =
        dateObj.getDate() === parseInt(day, 10) &&
        dateObj.getMonth() + 1 === parseInt(month, 10) &&
        dateObj.getFullYear() === parseInt(year, 10);
      if (!isValidDate) {
        return helpers.error("any.invalid");
      }

      const currentDate = new Date();
      if (dateObj > currentDate) {
        return helpers.error("any.invalid");
      }

      return value;
    }, "custom validation")
    .required(),
  phone: Joi.string().pattern(phoneRegex),
  city: Joi.string().pattern(cityRegex),
  pets: Joi.array(),
  favorite: Joi.array(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
};
