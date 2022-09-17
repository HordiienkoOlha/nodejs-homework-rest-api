const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./currentUser");
const usersSubscription = require("./usersSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  logout,
  currentUser,
  usersSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
