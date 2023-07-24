const Notice = require("../../models/notice");
const { ctrlWrapper } = require("../../decorators");
const { perPage } = require("../../constants/constants");

const getAll = async (req, res) => {
  const { page = 1, limit = perPage, category, query } = req.query;
  const skip = (page - 1) * limit;

  const parameters = () => {
    const queryParameters = {};

    if (category) {
      queryParameters.category = category;
    }

    if (query) {
      queryParameters.$or = [
        { title: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
        { comments: { $regex: query, $options: "i" } },
      ];
    }

    return queryParameters;
  };

  const queryParameters = parameters();

  const result = await Notice.find(queryParameters, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
