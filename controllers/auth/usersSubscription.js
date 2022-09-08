const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const usersSubscription = async (req, res) => {
  const id = req.user._id;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(id, { subscription });
  if (!user) {
    RequestError(401, "Not authorized");
  }

  res.json({
    code: 200,
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = usersSubscription;
