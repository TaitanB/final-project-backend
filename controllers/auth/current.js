const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  const { name, email, birthday, phone, city, avatarURL, pets } = req.user;

  res.json({
    name,
    email,
    birthday,
    phone,
    city,
    avatarURL,
    pets,
  });
};

module.exports = {
  current: ctrlWrapper(current),
};
