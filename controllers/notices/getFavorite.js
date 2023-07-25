const { ctrlWrapper } = require("../../decorators");
const Notice = require("../../models/notice");
const { perPage } = require("../../constants/constants");
const { getQueryParameters } = require("../../helpers");

const getFavorite = async (req, res) => {
  const { favorite } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);

  const total = await Notice.countDocuments({
    ...queryParameters,
    _id: { $in: favorite },
  });

  const favoriteNotices = await Notice.find(
    { ...queryParameters, _id: { $in: favorite } },
    "-name -type -comments -createdAt -updatedAt",
    { skip, limit }
  );

  res.status(200).json({ total, notices: favoriteNotices });
};

module.exports = {
  getFavorite: ctrlWrapper(getFavorite),
};
