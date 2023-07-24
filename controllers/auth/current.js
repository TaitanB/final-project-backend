const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  const { _id, name, email, birthday, phone, city, avatarURL, pets, favorite } =
    req.user;

  res.json({
    _id,
    name,
    email,
    birthday,
    phone,
    city,
    avatarURL,
    pets,
    favorite,
  });
};

module.exports = {
  current: ctrlWrapper(current),
};
