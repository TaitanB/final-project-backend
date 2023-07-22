const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers/HttpError");
const User = require("../../models/user");

const deletePet = async (req, res) => {
  const { id: petId } = req.params;
  const { _id, pets } = req.user;

  const newPets = pets.filter((pet) => pet._id.toString() !== petId);

  const result = await User.findByIdAndUpdate(
    _id,
    { pets: newPets },
    { new: true }
  );

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "Pet deleted" });
};

module.exports = {
  deletePet: ctrlWrapper(deletePet),
};
