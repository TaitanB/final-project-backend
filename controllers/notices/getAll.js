const Notice = require("../../models/notice");
const { ctrlWrapper } = require("../../decorators");
const perPage = require("../../constants/constants");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage, favorite, category, query } = req.query;
  const skip = (page - 1) * limit;

// параметри переписати!!!
  const parameters = () => {
    if (favorite) {
      return { owner, favorite };
    } else if (category) {
      return { owner, category };
    } else if (query) {
      return { owner, query };
    } else if (favorite && category) {
      return { owner, favorite, category };
    } else if (favorite && query) {
      return { owner, favorite, query };
    } else if (query && category) {
      return { owner, query, category };
    } else {
      return { owner };
    }
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
