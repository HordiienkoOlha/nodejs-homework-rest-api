const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/users/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/users/verify",
  validationBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail)
);

router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/users/current", authenticate, ctrlWrapper(ctrl.currentUser));

router.patch("/users", authenticate, ctrlWrapper(ctrl.usersSubscription));

router.patch(
  "/users/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
