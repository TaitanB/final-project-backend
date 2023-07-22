const { ctrlWrapper } = require("../../decorators");
const Pet = require("../../models/pet");
const User = require("../../models/user");

const addPet = async (req, res) => {
  const { _id, pets } = req.user;

  const pet = await Pet.create(req.body);

  const newPet = pet.toObject();
  delete newPet.createdAt;
  delete newPet.updatedAt;

  pets.push({ ...newPet });

  const user = await User.findByIdAndUpdate(_id, { pets }, { new: true });

  res.status(201).json(user.pets);
};

module.exports = {
  addPet: ctrlWrapper(addPet),
};
