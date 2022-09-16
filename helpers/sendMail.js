const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
const { RequestError } = require("../helpers");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "olhahordiienkomail@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw RequestError(400, error.message);
  }
};

const email = {
  to: "olgagordienko3mail@gmail.com",
  from: "olhahordiienkomail@gmail.com",
  subject: "test homework",
  html: "This is last homework",
};

sgMail
  .send(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

module.exports = sendEmail;
