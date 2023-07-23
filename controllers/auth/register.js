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

  const userNew = await User.create({ ...req.body, password: hashPassword });

  const { _id: id } = userNew;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token, userNew });

  res.status(201).json({
    token,
    user: {
      name: userNew.name,
      email: userNew.email,
      newUser: userNew,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
