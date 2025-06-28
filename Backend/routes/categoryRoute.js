const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjId");
const {
  getAllCategoriesCtrl,
  getCategoriesCountCtrl,
  createNewCategoryCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoriesController");

// /api/categories
router
  .route("/")
  .get(getAllCategoriesCtrl)
  .get(getCategoriesCountCtrl)
  .post(verifyTokenAndAdmin, createNewCategoryCtrl);

// /api/categories/count
router.route("/count").get(getCategoriesCountCtrl);

// /api/categories/:id
router
  .route("/:id")
  .delete(validateObjectId, verifyTokenAndAdmin, deleteCategoryCtrl);

module.exports = router;
