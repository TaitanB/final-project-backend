const { ctrlWrapper } = require("../../decorators");

const currentUser = async (req, res) => {
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
  currentUser: ctrlWrapper(currentUser),
};
