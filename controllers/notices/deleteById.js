const Notice = require("../../models/notice");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const deleteById = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: owner } = req.user;

  const result = await Notice.findOneAndRemove({
    $and: [{ _id: noticeId }, { owner }],
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: "Notice deleted",
    deletedNoticeId: noticeId,
  });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};
