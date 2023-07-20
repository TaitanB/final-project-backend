const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { updateUserAvatar, updateUserData } = require("./updateUser");

module.exports = {
  register,
  login,
  logout,
  current,
  updateUserAvatar,
  updateUserData,
};
