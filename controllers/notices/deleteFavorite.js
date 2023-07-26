const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers/HttpError");
const User = require("../../models/user");

const deleteFavorite = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: owner } = req.user;

  const result = await User.findByIdAndUpdate(owner, {
    $pull: { favorite: noticeId },
  });

  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: "Notice deleted from favorites",
    deletedNoticeId: noticeId,
  });
};

module.exports = {
  deleteFavorite: ctrlWrapper(deleteFavorite),
};
