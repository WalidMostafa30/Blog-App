const asyncHandler = require("express-async-handler");
const { Category, validateCreateCategory } = require("../models/Category");

/**-----------------------------------------------------
 * @method  Get all categories
 * @route   /api/categories
 * @method  GET
 * @access  public
------------------------------------------------------*/
const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categoriesList = await Category.find();
  res.status(200).json(categoriesList);
});

/**-----------------------------------------------------
 * @method  Get categories count
 * @route   /api/categories/count
 * @method  GET
 * @access  public
------------------------------------------------------*/
const getCategoriesCountCtrl = asyncHandler(async (req, res) => {
  const categoriesCount = await Category.countDocuments();
  res.status(200).json(categoriesCount);
});

/**-----------------------------------------------------
 * @method  Create new category
 * @route   /api/categories
 * @method  POST
 * @access  private (only admin)
------------------------------------------------------*/
const createNewCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const category = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(201).json(category);
});

/**-----------------------------------------------------
 * @method  Delete category
 * @route   /api/categories/:id
 * @method  DELETE
 * @access  private (only admin)
------------------------------------------------------*/
const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: `category not found` });
  }

  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `category has been deleted` });
});

module.exports = {
  getAllCategoriesCtrl,
  getCategoriesCountCtrl,
  createNewCategoryCtrl,
  deleteCategoryCtrl,
};
