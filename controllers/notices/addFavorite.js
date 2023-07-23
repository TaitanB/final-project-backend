const User = require("../../models/user");
const { ctrlWrapper } = require("../../decorators");

const addFavorite = async (req, res) => {
  const { id: noticeId } = req.params;
  const { _id: owner } = req.user;

  const user = await User.findByIdAndUpdate(
    owner,
    { $addToSet: { favorite: noticeId } },
    { new: true }
  );

  res.status(201).json(user.favorite);
};

module.exports = {
  addFavorite: ctrlWrapper(addFavorite),
};
