const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    subscription,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Confirm registration",
    htmk: `<a href="http://localhost:3000/auth/verify${verificationToken}" target="_blank">Confirm</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    email: result.email,
    subsctiption: result.subscription,
  });
};

module.exports = register;
