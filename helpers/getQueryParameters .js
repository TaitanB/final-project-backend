const { ageEnum } = require("../constants/constants");

const getAgeInMonths = (age) => {
  switch (age) {
    case ageEnum.FROM_0_TO_12:
      return { min: 0, max: 12 };
    case ageEnum.FROM_12_TO_24:
      return { min: 12, max: 24 };
    case ageEnum.MORE_THAN_24:
      return { min: 24, max: 2400 };
    default:
      throw new Error("Invalid age parameter");
  }
};

const getQueryParameters = (options = {}, owner) => {
  const { category, query, sex, age } = options;
  const queryParameters = {};

  if (owner) {
    queryParameters.owner = owner;
  }

  if (category) {
    queryParameters.category = category;
  }

  const andConditions = [];

  if (query) {
    andConditions.push({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { comments: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
      ],
    });
  }

  if (sex) {
    queryParameters.sex = sex;
  }

  if (age) {
    const ageArray = Array.isArray(age) ? age : age.split(",");
    const ageConditions = ageArray.map((ageItem) => {
      const { min, max } = getAgeInMonths(ageItem);
      const currentDate = new Date();
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - max);
      currentDate.setMonth(currentDate.getMonth() - min);

      return {
        date: {
          $lte: currentDate,
          $gte: date,
        },
      };
    });

    andConditions.push({ $or: ageConditions });
  }

  if (andConditions.length > 0) {
    queryParameters.$and = andConditions;
  }

  return queryParameters;
};

module.exports = getQueryParameters;
