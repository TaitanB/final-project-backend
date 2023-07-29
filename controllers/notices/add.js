const Notice = require("../../models/notice");
const { ctrlWrapper } = require("../../decorators");

const formatDate = (date) => {
  const [day, month, year] = date.split("-");
  return new Date(`${year}-${month}-${day}`);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const file = req.file.path;
  const formattedDate = formatDate(req.body.date);
  const result = await Notice.create({
    ...req.body,
    date: formattedDate,
    file,
    owner,
  });

  const response = result.toObject();

  res.status(201).json(response);
};

module.exports = {
  add: ctrlWrapper(add),
};
