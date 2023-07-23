const Joi = require("joi");

const {
  nameRegex,
  birthdayRegex,
  cityRegex,
} = require("../constants/constants");

const noticeSchema = Joi.object({
  title: Joi.string().min(4).max(30),
  category: Joi.string().valid("sell", "lost-found", "for-free").required(),
  name: Joi.string().regex(nameRegex).required(),
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
  file: Joi.string(),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().regex(cityRegex).required(),
  price: Joi.number().min(0.01).when("category", {
    is: "sell",
    then: Joi.number().required(),
    otherwise: Joi.number().forbidden(),
  }),
  comments: Joi.string().max(120).allow(""),
});

module.exports = noticeSchema;
