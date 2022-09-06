const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const currentUser = async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);
  if (!user) {
    RequestError(401, "Not authorized");
  }

  res.json({
    code: 200,
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = currentUser;
