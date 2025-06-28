const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const {
  Post,
  validateCreatePost,
  validateUpdatePost,
} = require("../models/Post");
const {
  cloudinaryUploadImage,
  cloudinaryDeleteImage,
} = require("../utils/cloudinary");
const { Comment } = require("../models/Comment");

/**-----------------------------------------------
 * @method  Get all posts
 * @route   /api/posts
 * @method  GET
 * @access  public
------------------------------------------------*/
const getAllPostsCtrl = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 2;
  const { pageNumber, category } = req.query;

  let postsList;

  if (pageNumber) {
    postsList = await Post.find()
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", "-password");
  } else if (category) {
    postsList = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", "-password");
  } else {
    postsList = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "-password");
  }
  res.status(200).json(postsList);
});

/**-----------------------------------------------
 * @method  Get single post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public
------------------------------------------------*/
const getSinglePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", "-password")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username profilePhoto",
      },
    });

  if (!post) {
    return res.status(404).json({ message: `post not found` });
  }

  res.status(200).json(post);
});

/**-----------------------------------------------------
 *  @method  Get posts count
 *  @route   /api/posts/count
 *  @method  GET
 *  @access  private (only admin)
------------------------------------------------------*/
const getPostsCountCtrl = asyncHandler(async (req, res) => {
  const postsCount = await Post.countDocuments();
  res.status(200).json(postsCount);
});

/**-----------------------------------------------
 * @method  Create new post
 * @route   /api/posts
 * @method  POST
 * @access  private (only logged in user)
------------------------------------------------*/
const createNewPostCtrl = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }

  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  const result = await cloudinaryUploadImage(imagePath);

  const post = await Post.create({
    title,
    description,
    category,
    user: req.user.id,
    image: {
      publicId: result.public_id,
      url: result.secure_url,
    },
  });

  fs.unlinkSync(imagePath);

  res.status(201).json(post);
});

/**-----------------------------------------------
 * @method  Update post
 * @route   /api/posts/:id
 * @method  PUT
 * @access  private (only owner of this post)
------------------------------------------------*/
const updatePostCtrl = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: `post not found` });
  }

  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: `access denied, you are not the owner` });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: { title, description, category },
    },
    { new: true }
  )
    .populate("user", "-password")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username profilePhoto",
      },
    });

  res.status(200).json(updatedPost);
});

/**-----------------------------------------------
 * @method  Update post image
 * @route   /api/posts/upload-image/:id
 * @method  PUT
 * @access  private (only owner of this post)
------------------------------------------------*/
const updatePostImageCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: `post not found` });
  }

  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: `access denied, you are not the owner` });
  }

  await cloudinaryDeleteImage(post.image.publicId);

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  const result = await cloudinaryUploadImage(imagePath);

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  fs.unlinkSync(imagePath);

  res.status(200).json(updatedPost);
});

/**-----------------------------------------------
 * @method  Delete post
 * @route   /api/posts/:id
 * @method  DELETE
 * @access  private (only admin or owner of this post)
------------------------------------------------*/
const deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: `post not found` });
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await cloudinaryDeleteImage(post.image.publicId);

    // delete all comments related to this post
    await Comment.deleteMany({ postId: post._id });

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `post has been deleted successfully` });
  } else {
    res
      .status(403)
      .json({ message: `access denied, only owner or admin can delete` });
  }
});

/**-----------------------------------------------
 * @method  Toggle likes
 * @route   /api/posts/likes/:id
 * @method  PUT
 * @access  private (only logged in user)
------------------------------------------------*/
const toggleLikeCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const isPostLiked = post.likes.some(
    (user) => user.toString() === req.user.id
  );

  const update = isPostLiked
    ? { $pull: { likes: req.user.id } }
    : { $push: { likes: req.user.id } };

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, update, {
    new: true,
  })
    .populate("user", "-password")
    .populate("comments");

  res.status(200).json(updatedPost);
});

module.exports = {
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostsCountCtrl,
  createNewPostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  deletePostCtrl,
  toggleLikeCtrl,
};
