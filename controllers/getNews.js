const Article = require("../models/article");
const { ctrlWrapper } = require("../decorators");

const getNews = async (req, res) => {
  const { page = 1, limit = 6, query } = req.query;
  const skip = (page - 1) * limit;
  const queryParameters = {};

  if (query) {
    queryParameters.$or = [
      { title: { $regex: query, $options: "i" } },
      { text: { $regex: query, $options: "i" } },
    ];
  }

  const total = await Article.countDocuments(queryParameters);

  const result = await Article.find(queryParameters, "-_id", { skip, limit });

  res.status(200).json({ total, articles: result });
};

module.exports = {
  getNews: ctrlWrapper(getNews),
};
