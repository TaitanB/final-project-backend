const { ctrlWrapper } = require("../../decorators");
const Notice = require("../../models/notice");

const getFavorite = async (req, res) => {
  const { favorite } = req.user;

  try {
    const favoriteNotices = await Notice.find({ _id: { $in: favorite } });

    res.status(200).json(favoriteNotices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getFavorite: ctrlWrapper(getFavorite),
};
