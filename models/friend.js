const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  addressUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  workDays: [
    {
      isOpen: {
        type: Boolean,
        required: true,
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
    required: true,
  },
  email: {
    type: String,
  },
});

const Friend = mongoose.model("sponsor", friendSchema);

module.exports = Friend;
