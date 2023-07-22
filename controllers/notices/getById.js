const Notice = require("../../models/notice");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getById = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: owner } = req.user;

  const result = await Notice.findOne({
    $and: [{ _id: noticeId }, { owner }],
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};