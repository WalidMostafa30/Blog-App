const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const {
  getAllUsersCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  deleteUserProfileCtrl,
  getUsersCountCtrl,
  uploadProfilePhotoCtrl,
} = require("../controllers/usersController");
const validateObjectId = require("../middlewares/validateObjId");
const photoUpload = require("../middlewares/photoUpload");

// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

// /api/users/profile/:id
router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);

// /api/users/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), uploadProfilePhotoCtrl);

module.exports = router;
