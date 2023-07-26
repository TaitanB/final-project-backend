const User = require("../../models/user");

const ctrlWrapper = require("../../decorators/ctrlWrapper");

const updateUserData = async (req, res) => {
  const { name, birthday, phone, city } = req.body;
  const { _id } = req.user;
  const avatarURL = req.file.path;

  const user = await User.findByIdAndUpdate(
    _id,
    { name, birthday, phone, city, avatarURL },
    { new: true }
  );

  res.json({
    _id,
    avatarURL: user.avatarURL,
    name: user.name,
    birthday: user.birthday,
    phone: user.phone,
    city: user.city,
  });
};

module.exports = {
  updateUserData: ctrlWrapper(updateUserData),
};
