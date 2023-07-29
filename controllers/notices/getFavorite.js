const { ctrlWrapper } = require("../../decorators");
const Notice = require("../../models/notice");
const { perPage } = require("../../constants/constants");
const { getQueryParameters, formatDate } = require("../../helpers");

const getFavorite = async (req, res) => {
  const { favorite } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);

  const total = await Notice.countDocuments({
    ...queryParameters,
    _id: { $in: favorite },
  });

  const totalPages = Math.ceil(total / perPage);

  const favoriteNotices = await Notice.find(
    { ...queryParameters, _id: { $in: favorite } },
    "-name -type -comments -createdAt -updatedAt",
    { skip, limit }
  );

  const formattedResult = favoriteNotices.map((notice) => ({
    ...notice._doc,
    date: formatDate(notice.date),
  }));

  res.status(200).json({ page, perPage, totalPages, notices: formattedResult });
};

module.exports = {
  getFavorite: ctrlWrapper(getFavorite),
};
