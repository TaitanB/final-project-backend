const Joi = require("joi");

const { nameRegex, birthdayRegex } = require("../constants/constants");

const petSchema = Joi.object({
  name: Joi.string().pattern(nameRegex).required().messages({
    "string.base": "The name must be a string of 2 to 16 symbols.",
    "any.required": "The name field is required.",
  }),
  date: Joi.string()
    .pattern(birthdayRegex)
    .required()
    .messages({
      "any.required": "The birthday field is required.",
      "string.pattern.base": "The birthday must be in format DD-MM-YYYY.",
    })
    .custom((value, helpers) => {
      const [day, month, year] = value.split("-");
      const dateObj = new Date(`${year}-${month}-${day}`);

      if (isNaN(dateObj.getTime())) {
        return helpers.error("any.invalid", {
          message: "Invalid birthday format. Please use DD-MM-YYYY.",
        });
      }

      const isValidDate =
        dateObj.getDate() === parseInt(day, 10) &&
        dateObj.getMonth() + 1 === parseInt(month, 10) &&
        dateObj.getFullYear() === parseInt(year, 10);
      if (!isValidDate) {
        return helpers.error("any.invalid", {
          message: "Invalid birthday date. Please enter a valid date.",
        });
      }

      const currentDate = new Date();
      if (dateObj > currentDate) {
        return helpers.error("any.invalid", {
          message: "Birthday date cannot be in the future.",
        });
      }

      return value;
    }, "custom validation"),
  type: Joi.string().min(2).max(16).required().messages({
    "string.base": "The type must be a string of 2 to 16 symbols.",
    "any.required": "The type field is required.",
    "string.min": "The type must be not less 2 symbols.",
    "string.max": "The type must be no more 16 symbols.",
  }),
  file: Joi.string().uri().messages({
    "string.base": "The file must be a string.",
    "string.uri": "The file must be a valid URL.",
  }),
  comments: Joi.string().max(120).allow("").messages({
    "string.base": "The comments must be a string.",
    "string.max": "The comments must be no more 120 symbols.",
  }),
});

module.exports = petSchema;
