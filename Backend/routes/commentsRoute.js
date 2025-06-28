const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middlewares/verifyToken");
const {
  getAllCommentsCtrl,
  createNewCommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
  getCommentsCountCtrl,
} = require("../controllers/commentsController");
const validateObjectId = require("../middlewares/validateObjId");

// /api/comments
router
  .route("/")
  .get(verifyTokenAndAdmin, getAllCommentsCtrl)
  .post(verifyToken, createNewCommentCtrl);

// /api/comments/count
router.route("/count").get(verifyTokenAndAdmin, getCommentsCountCtrl);

// /api/comments/:id
router
  .route("/:id")
  .put(validateObjectId, verifyToken, updateCommentCtrl)
  .delete(validateObjectId, verifyToken, deleteCommentCtrl);

module.exports = router;
