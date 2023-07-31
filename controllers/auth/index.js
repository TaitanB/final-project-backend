const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { currentUser } = require("./currentUser");
const { updateUserData } = require("./updateUser");
const { googleAuth } = require("./googleAuth");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateUserData,
  googleAuth,
};
