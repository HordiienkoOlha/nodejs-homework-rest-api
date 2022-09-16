const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate, upload } = require("../../middlewares");

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

// current user
router.get("/users/current", authenticate, ctrlWrapper(ctrl.currentUser));

// subscription
router.patch("/users", authenticate, ctrlWrapper(ctrl.usersSubscription));

// updateAvatar
router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

// logo out
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
