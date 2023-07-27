const { Schema, model } = require("mongoose");

const friendSchema = new Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  addressUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  workDays: [
    {
      isOpen: {
        type: Boolean,
      },
      from: {
        type: String,
      },
      to: {
        type: String,
      },
    },
  ],
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Friend = model("sponsor", friendSchema);

module.exports = Friend;
