const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const {
  nameRegex,
  birthdayRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  cityRegex,
} = require("../constants/constants");

const userSchema = new Schema(
  {
    token: {
      type: String,
    },
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
    avatarURL: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dxr3bntge/image/upload/v1690100899/misc/avatar-default.png.png",
    },
    birthday: {
      type: String,
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
    pets: {
      type: [
        {
          name: {
            type: String,
            match: nameRegex,
            required: [true, "Name is required"],
          },
          date: {
            type: String,
            match: birthdayRegex,
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
            required: [true, "File is required"],
          },
          comments: {
            type: String,
            maxlength: 120,
            default: "",
          },
        },
      ],
      default: [],
    },
    favorite: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
