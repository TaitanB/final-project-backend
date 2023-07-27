const Notice = require("../../models/notice");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getById = async (req, res) => {
  const { id: noticeId } = req.params;

  const result = await Notice.findOne({ _id: noticeId }, "-updatedAt").populate(
    "owner",
    "name email phone"
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
