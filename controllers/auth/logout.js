const { User } = require("../../models/user");

const logout = async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  user.token = null;
  await user.save();
  res.json({
    code: 200,
    message: "Logout success",
  });
};

module.exports = logout;
