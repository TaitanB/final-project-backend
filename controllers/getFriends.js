const Friend = require("../models/friend");
const { ctrlWrapper } = require("../decorators");

const getFriends = async (req, res) => {
  const result = await Friend.find();

  res.status(200).json(result);
};

module.exports = {
  getFriends: ctrlWrapper(getFriends),
};
