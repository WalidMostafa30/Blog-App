const express = require("express");
const router = express.Router();
const {
  getForgotPasswordViewCtrl,
  sendForgotPasswordLinkCtrl,
  getResetPasswordViewCtrl,
  resetPasswordCtrl,
} = require("../controllers/passwordController");

// /password/forgot-password
router
  .route("/forgot-password")
  .get(getForgotPasswordViewCtrl)
  .post(sendForgotPasswordLinkCtrl);

// /password/reset-password/:userId/:token
router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordViewCtrl)
  .post(resetPasswordCtrl);

module.exports = router;
