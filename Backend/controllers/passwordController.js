const asyncHandler = require("express-async-handler");
const { User, validateResetPassword } = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

/**
 * @method  get forgot password view
 * @route   /password/forgot-password
 * @method  GET
 * @access  public
 */
const getForgotPasswordViewCtrl = asyncHandler((req, res) => {
  res.render("forgot-password");
});

/**
 * @method  send forgot password link
 * @route   /password/forgot-password
 * @method  POST
 * @access  public
 */
const sendForgotPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = JWT.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: "10m",
  });

  const link = `http://localhost:${process.env.PORT}/password/reset-password/${user._id}/${token}`;
  res.json({
    message: "click on the link to reset your password",
    resetPasswordLink: link,
  });

  // %%%%%%%%%%%%%%%%%%%%%% send email %%%%%%%%%%%%%%%%%%%%%%

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.PASSWORD,
  //   },
  // });

  // const mailOptions = {
  //   from: process.env.EMAIL,
  //   to: user.email,
  //   subject: "reset password",
  //   html: `
  //   <h1>click on the link to reset your password</h1>
  //   <a href="${link}">${link}</a>
  //   `,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error);
  //   }
  //   console.log("Email sent: " + info.response);

  //   res.render("link-sent", {
  //     message: "check your email, we sent you a link",
  //   });
  // });
});

/**
 * @method  get reset password view
 * @route   /password/reset-password/:userId/:token
 * @method  GET
 * @access  public
 */
const getResetPasswordViewCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  try {
    const secret = process.env.JWT_SECRET_KEY + user.password;
    JWT.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "invalid link or expired" });
  }
});

/**
 * @method  reset password
 * @route   /password/reset-password/:userId/:token
 * @method  POST
 * @access  public
 */
const resetPasswordCtrl = asyncHandler(async (req, res) => {
  const { error } = validateResetPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  try {
    const secret = process.env.JWT_SECRET_KEY + user.password;
    JWT.verify(req.params.token, secret);

    // check if password is same as old password
    const isSamePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isSamePassword) {
      return res
        .status(400)
        .json({ message: "this password is used before, try another one" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user.password = req.body.password;
    await user.save();

    res.render("success-password", {
      message: "password reset successfully, please login",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "invalid link or expired" });
  }
});

module.exports = {
  getForgotPasswordViewCtrl,
  sendForgotPasswordLinkCtrl,
  getResetPasswordViewCtrl,
  resetPasswordCtrl,
};
