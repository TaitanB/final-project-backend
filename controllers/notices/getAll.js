const Notice = require("../../models/notice");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
const { getQueryParameters, formatDate } = require("../../helpers");

const getAll = async (req, res) => {
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);

  const total = await Notice.countDocuments(queryParameters);

  const totalPages = Math.ceil(total / perPage);

  const result = await Notice.find(
    queryParameters,
    "-name -type -comments -createdAt -updatedAt",
    { skip, limit }
  ).sort({ createdAt: -1 });

  const formattedResult = result.map((notice) => ({
    ...notice._doc,
    date: formatDate(notice.date),
  }));

  res.status(200).json({ page, perPage, totalPages, notices: formattedResult });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
};
