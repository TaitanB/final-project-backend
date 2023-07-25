const Notice = require("../../models/notice");
const { ctrlWrapper } = require("../../decorators");
const { perPage } = require("../../constants/constants");
const { getQueryParameters } = require("../../helpers");

const getAllOwner = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query, owner);

  const total = await Notice.countDocuments(queryParameters);

  const result = await Notice.find(
    queryParameters,
    "-name -type -comments -createdAt -updatedAt",
    { skip, limit }
  );

  res.status(200).json({ total, notices: result });
};

module.exports = {
  getAllOwner: ctrlWrapper(getAllOwner),
};
