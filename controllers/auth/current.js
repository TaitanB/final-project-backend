const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  const { name, email, birthday, phone, city, avatarURL } = req.user;

  res.json({
    name,
    email,
    birthday,
    phone,
    city,
    avatarURL,
  });
};

module.exports = {
  current: ctrlWrapper(current),
};
