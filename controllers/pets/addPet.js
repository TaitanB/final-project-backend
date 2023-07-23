const { ctrlWrapper } = require("../../decorators");
const User = require("../../models/user");

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  const { name, date, type, comments } = req.body;
  const file = req.file.path;

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
