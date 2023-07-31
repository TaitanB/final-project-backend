const { ctrlWrapper } = require("../../decorators");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const { SECRET_KEY, FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`${FRONTEND_URL}/login?token=${token}`);
};

module.exports = {
  googleAuth: ctrlWrapper(googleAuth),
};
