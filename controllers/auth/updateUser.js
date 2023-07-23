const User = require("../../models/user");

const ctrlWrapper = require("../../decorators/ctrlWrapper");

const updateUserData = async (req, res) => {
  const { name, birthday, phone, city } = req.body;
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    { name, birthday, phone, city },
    { new: true }
  );
  res.json({ user });
};

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;

  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = {
  updateUserData: ctrlWrapper(updateUserData),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
