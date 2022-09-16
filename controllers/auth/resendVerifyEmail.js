const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, "missing required field email");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const { verificationToken } = user;
  const mail = {
    to: email,
    subject: "Confirm registration",
    htmk: `<a href="http://localhost:3000/auth/verify${verificationToken}" target="_blank">Confirm</a>`,
  };
  await sendEmail(mail);
  res.json({
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
