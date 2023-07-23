const { ctrlWrapper } = require("../../decorators");
const Notice = require("../../models/notice");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const file = req.file.path;

  const result = await Notice.create({ ...req.body, file, owner });

  const response = result.toObject();

  res.status(201).json(response);
};

module.exports = {
  add: ctrlWrapper(add),
};
