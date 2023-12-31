const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers/HttpError");
const User = require("../../models/user");

const deletePet = async (req, res) => {
  const { id: petId } = req.params;
  const { _id: owner } = req.user;

  const result = await User.findByIdAndUpdate(owner, {
    $pull: { pets: { _id: petId } },
  });

  if (!result) {
    throw HttpError(404);
  }

  res.json({
    message: "Pet deleted",
    deletedNoticeId: petId,
  });
};

module.exports = {
  deletePet: ctrlWrapper(deletePet),
};
