const { ctrlWrapper } = require("../../decorators");
const Notice = require("../../models/notice");
const { perPage } = require("../../constants/constants");

const getFavorite = async (req, res) => {
  const { favorite } = req.user;
  const { page = 1, limit = perPage, category, query } = req.query;
  const skip = (page - 1) * limit;

  const parameters = () => {
    const queryParameters = {};

    if (category) {
      queryParameters.category = category;
    }

    if (query) {
      queryParameters.title = { $regex: query, $options: "i" };
    }

    return queryParameters;
  };

  const queryParameters = parameters();

  try {
    const favoriteNotices = await Notice.find(
      { ...queryParameters, _id: { $in: favorite } },
      "-name -type -comments -createdAt -updatedAt",
      { skip, limit }
    );

    res.status(200).json(favoriteNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getFavorite: ctrlWrapper(getFavorite),
};
