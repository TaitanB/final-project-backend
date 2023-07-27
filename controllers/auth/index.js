const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { currentUser } = require("./currentUser");
const { updateUserData } = require("./updateUser");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateUserData,
};
