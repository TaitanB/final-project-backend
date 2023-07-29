const Notice = require("../../models/notice");
const { HttpError, formatDate } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getById = async (req, res) => {
  const { id: noticeId } = req.params;

  const result = await Notice.findOne({ _id: noticeId }, "-updatedAt").populate(
    "owner",
    "name email phone"
  );

  const formattedResult = {
    ...result._doc,
    date: formatDate(result.date),
  };

  if (!formattedResult) {
    throw HttpError(404, "Not found");
  }

  res.json(formattedResult);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
