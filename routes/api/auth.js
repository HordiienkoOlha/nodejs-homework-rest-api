const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// sign up
router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

// sign in
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

// logo ut
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

// current user

router.get("/current", authenticate, ctrlWrapper(ctrl.currentUser));

// subscription

router.patch("/users", authenticate, ctrlWrapper(ctrl.usersSubscription));

module.exports = router;
