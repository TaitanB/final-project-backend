const Notice = require("../../models/notice");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const updateStatus = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: owner } = req.user;

  const result = await Notice.findOne({
    $and: [{ _id: noticeId }, { owner }],
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  result.favorite = !result.favorite;

  await result.save();

  res.json(result);
};

module.exports = {
  updateStatus: ctrlWrapper(updateStatus),
};
