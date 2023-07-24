const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const {
  nameRegex,
  emailRegex,
  passwordRegex,
  phoneRegex,
  cityRegex,
} = require("../constants/constants");

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
      default:
        "https://res.cloudinary.com/dxr3bntge/image/upload/v1690100899/misc/avatar-default.png.png",
      required: true,
    },
    birthday: {
      type: String,
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
          comments: {
            type: String,
            maxlength: 120,
          },
        },
      ],
      default: [],
    },
    favorite: {
      type: Array,
      default: [],
    },
    newUser: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
