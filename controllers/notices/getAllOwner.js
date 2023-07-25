const Notice = require("../../models/notice");
const { ctrlWrapper } = require("../../decorators");
const { perPage } = require("../../constants/constants");

const getAllOwner = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage, category, query } = req.query;
  const skip = (page - 1) * limit;

  const parameters = () => {
    let queryParameters;

    if (owner) {
      queryParameters = { owner };
    }

    if (category) {
      queryParameters.category = category;
    }

    if (query) {
      queryParameters.title = { $regex: query, $options: "i" };
    }

    return queryParameters;
  };

  const queryParameters = parameters();

  const result = await Notice.find(
    queryParameters,
    "-name -type -comments -createdAt -updatedAt",
    {
      skip,
      limit,
    }
  );

  res.json(result);
};

module.exports = {
  getAllOwner: ctrlWrapper(getAllOwner),
};
