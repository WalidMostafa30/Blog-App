const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const bcrypt = require("bcryptjs");

/**-----------------------------------------------------
 * @method  Register new user
 * @route   /api/auth/register
 * @method  POST
 * @access  public
------------------------------------------------------*/
const registerUserCtrl = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "This user already exists." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return res
    .status(201)
    .json({ message: "User registered successfully, please login." });
});

/**-----------------------------------------------------
 * @method  Login user
 * @route   /api/auth/login
 * @method  POST
 * @access  public
------------------------------------------------------*/
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const token = user.generateAuthToken();

  res.status(200).json({
    username: user.username,
    email: user.email,
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto?.url,
    createdAt: user.createdAt,
    token,
  });
});

module.exports = { registerUserCtrl, loginUserCtrl };
