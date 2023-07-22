const { ctrlWrapper } = require("../../decorators");
const User = require("../../models/user");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  const { name, date, type, file, comments } = req.body;

  const newPet = {
    name,
    date,
    type,
    file,
    comments,
  };

  const user = await User.findByIdAndUpdate(
    owner,
    { $push: { pets: newPet } },
    { new: true }
  );

  res.status(201).json(user.pets);
};

module.exports = {
  addPet: ctrlWrapper(addPet),
};
