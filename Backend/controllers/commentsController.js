const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateCreateComment,
  validateUpdateComment,
} = require("../models/Comment");
const { User } = require("../models/User");
const { Post } = require("../models/Post");

/**-----------------------------------------------------
 * @method  Get all comments
 * @route   /api/comments
 * @method  GET
 * @access  private (only admin)
------------------------------------------------------*/
const getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const commentsList = await Comment.find().populate("user", "-password");
  res.status(200).json(commentsList);
});

/**-----------------------------------------------------
 * @method  Get comments count
 * @route   /api/comments/count
 * @method  GET
 * @access  private (only admin)
------------------------------------------------------*/
const getCommentsCountCtrl = asyncHandler(async (req, res) => {
  const commentsCount = await Comment.countDocuments();
  res.status(200).json(commentsCount);
});

/**-----------------------------------------------------
 * @method  Create new comment
 * @route   /api/comments
 * @method  POST
 * @access  private (only logged in user)
------------------------------------------------------*/
const createNewCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const profile = await User.findById(req.user.id);

  if (!profile) {
    return res.status(404).json({ message: "user not found" });
  }

  const post = await Post.findById(req.body.postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const newComment = await Comment.create({
    user: req.user.id,
    postId: req.body.postId,
    text: req.body.text,
  });

  const populatedComment = await Comment.findById(newComment._id).populate({
    path: "user",
    select: "_id username profilePhoto",
  });

  res.status(201).json(populatedComment);
});

/**-----------------------------------------------------
 * @method  Update comment
 * @route   /api/comments/:id
 * @method  PUT
 * @access  private (only owner of this comment)
------------------------------------------------------*/
const updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }

  if (req.user.id !== comment.user._id.toString()) {
    return res
      .status(403)
      .json({ message: `access denied, you are not the owner` });
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: req.body.text,
      },
    },
    { new: true }
  ).populate({
    path: "user",
    select: "_id username profilePhoto",
  });

  res.status(201).json(updatedComment);
});

/**-----------------------------------------------------
 * @method  Delete comment by id
 * @route   /api/comments/:id
 * @method  DELETE
 * @access  private (only admin and owner of this comment)
------------------------------------------------------*/
const deleteCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }

  if (req.user.isAdmin || req.user.id === comment.user._id.toString()) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `comment has been deleted` });
  } else {
    return res
      .status(403)
      .json({ message: `access denied, you are not the owner` });
  }
});

module.exports = {
  getAllCommentsCtrl,
  getCommentsCountCtrl,
  createNewCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
};
