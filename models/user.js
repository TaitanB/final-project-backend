const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const {
  nameRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  birthdayRegex,
  cityRegex,
} = require("../constants/users");

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegex,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      match: passwordRegex,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
    },
    avatarURL: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      match: birthdayRegex,
      default: "",
    },
    phone: {
      type: String,
      match: phoneRegex,
      default: "",
    },
    city: {
      type: String,
      match: cityRegex,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
