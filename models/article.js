const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  imgUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  date: {
    type: Date,
  },
  url: {
    type: String,
  },
  id: {
    type: String,
    unique: true,
  },
});

articleSchema.index({ title: "text" }, { text: "text" });

const Article = model("article", articleSchema);

module.exports = Article;
