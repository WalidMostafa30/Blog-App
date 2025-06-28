const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");
const {
  createNewPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostsCountCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  deletePostCtrl,
  toggleLikeCtrl,
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjId");

// /api/posts
router
  .route("/")
  .get(getAllPostsCtrl)
  .post(verifyToken, photoUpload.single("image"), createNewPostCtrl);

// /api/posts/count
router.route("/count").get(verifyTokenAndAdmin, getPostsCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl);

// /api/posts/upload-image/:id
router
  .route("/upload-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
);
  
// /api/posts/likes/:id
router
  .route("/likes/:id")
  .put(validateObjectId, verifyToken, toggleLikeCtrl)

module.exports = router;
