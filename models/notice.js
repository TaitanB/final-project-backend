const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const { nameRegex, cityRegex } = require("../constants/constants");

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      min: 4,
      maxlength: 30,
      required: [true, "Title is required"],
    },
    category: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      required: [true, "Category is required"],
    },
    name: {
      type: String,
      match: nameRegex,
      required: [true, "Name is required"],
    },
    date: {
      type: String,
      default: "",
      required: [true, "Date is required"],
    },
    type: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, "Type is required"],
    },
    file: {
      type: String,
      default: "",
      required: true,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: function () {
        return ["sell", "lost-found", "for-free"].includes(this.category);
      },
    },
    location: {
      type: String,
      match: cityRegex,
      required: function () {
        return ["sell", "lost-found", "for-free"].includes(this.category);
      },
    },
    price: {
      type: Number,
      min: 0.01,
      required: function () {
        return this.category === "sell";
      },
    },
    comments: {
      type: String,
      maxlength: 120,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.index({ title: "text", type: "text", comments: "text" });

noticeSchema.post("save", handleMongooseError);

const Notice = model("notice", noticeSchema);

module.exports = Notice;
