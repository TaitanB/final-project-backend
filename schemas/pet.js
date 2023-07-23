const Joi = require("joi");

const { nameRegex, birthdayRegex } = require("../constants/constants");

const petSchema = Joi.object({
  name: Joi.string().pattern(nameRegex).required(),
  date: Joi.string()
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
  type: Joi.string().min(2).max(16).required(),
  file: Joi.string().required(),
  comments: Joi.string().max(120).allow(""),
});

module.exports = petSchema;
