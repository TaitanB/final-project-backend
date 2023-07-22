const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const { nameRegex } = require("../constants/constants");

const petSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegex,
      required: [true, "Name is required"],
    },
    date: {
      type: Date,
      default: "",
      // required: [true, "Date is required"],
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
      // required: true,
    },
    comments: {
      type: String,
      maxlength: 120,
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post("save", handleMongooseError);

const Pet = model("pet", petSchema);

module.exports = Pet;
