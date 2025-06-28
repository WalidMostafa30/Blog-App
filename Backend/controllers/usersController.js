const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { User, validateUpdateUser } = require("../models/User");
const {
  cloudinaryUploadImage,
  cloudinaryDeleteImage,
  cloudinaryDeleteMultipleImage,
} = require("../utils/cloudinary");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");

/**-----------------------------------------------------
 *  @method  Get all users profile
 *  @route   /api/users/profile
 *  @method  GET
 *  @access  private (only admin)
------------------------------------------------------*/
const getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});

/**-----------------------------------------------------
 *  @method  Get users count
 *  @route   /api/users/count
 *  @method  GET
 *  @access  private (only admin)
------------------------------------------------------*/
const getUsersCountCtrl = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  res.status(200).json(usersCount);
});

/**-----------------------------------------------------
 *  @method  Get user profile
 *  @route   /api/users/profile/:id
 *  @method  GET
 *  @access  public
------------------------------------------------------*/
const getUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate({
      path: "posts",
      populate: {
        path: "user",
        select: "username profilePhoto _id",
      },
    });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json(user);
});

/**-----------------------------------------------------
 *  @method  Update user profile
 *  @route   /api/users/profile/:id
 *  @method  PUT
 *  @access  private (only user himself)
------------------------------------------------------*/
const updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { username, password, bio } = req.body;

  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  let hashedPassword = user.password;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username,
        password: hashedPassword,
        bio,
      },
    },
    { new: true }
  )
    .select("-password")
    .populate({
      path: "posts",
      populate: {
        path: "user",
        select: "username profilePhoto _id",
      },
    });

  res.status(200).json(updatedUser);
});

/**-----------------------------------------------------
 *  @method  Upload profile photo 
 *  @route   /api/users/profile/profile-photo-upload
 *  @method  POST
 *  @access  private (only user himself)
------------------------------------------------------*/
const uploadProfilePhotoCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided." });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  const result = await cloudinaryUploadImage(imagePath);

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Delete old profile photo if exists
  if (user.profilePhoto?.publicId) {
    await cloudinaryDeleteImage(user.profilePhoto.publicId);
  }

  // Update user profile photo
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  // Delete local image after upload
  fs.unlinkSync(imagePath);

  res.status(200).json({
    url: result.secure_url,
    publicId: result.public_id,
  });
});

/**-----------------------------------------------------
 *  @method  Delete user profile
 *  @route   /api/users/profile/:id
 *  @method  DELETE
 *  @access  private (only admin and user himself)
------------------------------------------------------*/
const deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Get posts created by user
  const posts = await Post.find({ user: user._id });

  const postIds = posts.map((post) => post._id);

  // Get image publicIds of posts
  const postsImagesIds = posts
    .map((post) => post.image?.publicId)
    .filter(Boolean);

  // Delete post images from Cloudinary
  if (postsImagesIds.length > 0) {
    try {
      await cloudinaryDeleteMultipleImage(postsImagesIds);
    } catch (err) {
      console.error("Error deleting post images:", err);
      return res.status(500).json({ message: "Failed to delete post images." });
    }
  }

  // Delete profile photo from Cloudinary
  if (user.profilePhoto?.publicId) {
    try {
      await cloudinaryDeleteImage(user.profilePhoto.publicId);
    } catch (err) {
      console.error("Error deleting profile image:", err);
      return res
        .status(500)
        .json({ message: "Failed to delete profile image." });
    }
  }

  try {
    // Delete posts
    await Post.deleteMany({ user: user._id });

    // Delete comments created by the user
    await Comment.deleteMany({ user: user._id });

    // Delete comments on user's posts
    await Comment.deleteMany({ postId: { $in: postIds } });

    // Delete user
    await User.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.error("Error deleting user data:", err);
    return res
      .status(500)
      .json({ message: "Failed to delete user-related data." });
  }

  res.status(200).json({ message: "User deleted successfully." });
});


module.exports = {
  getAllUsersCtrl,
  getUsersCountCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  uploadProfilePhotoCtrl,
  deleteUserProfileCtrl,
};
