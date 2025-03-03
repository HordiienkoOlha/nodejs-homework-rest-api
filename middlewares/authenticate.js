const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { RequestError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  if (!req.headers.authorization) {
    next(RequestError(401, "Unauthorized"));
  }

  if (!req.headers.authorization.startsWith("Bearer")) {
    next(RequestError(401, "No Bearer token"));
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    next(RequestError(401, "No token provided"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id).select("-password");
    if (!user) {
      next(RequestError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};

module.exports = authenticate;
