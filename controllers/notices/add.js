const { ctrlWrapper } = require("../../decorators");
const Notice = require("../../models/notice");

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Notice.create({ ...req.body, owner });

  const response = result.toObject();
  delete response.createdAt;
  delete response.updatedAt;

  res.status(201).json(response);
};

module.exports = {
  add: ctrlWrapper(add),
};
