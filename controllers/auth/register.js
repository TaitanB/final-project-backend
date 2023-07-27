const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  const { _id: id } = newUser;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token, newUser });

  res.status(201).json({
    token,
    user: {
      _id: id,
      name: newUser.name,
      email: newUser.email,
      birthday: newUser.birthday,
      phone: newUser.phone,
      city: newUser.city,
      avatarURL: newUser.avatarURL,
      pets: newUser.pets,
      favorite: newUser.favorite,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
