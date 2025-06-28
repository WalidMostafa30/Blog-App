const mongoose = require("mongoose");
const joi = require("joi");

// category schema
const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// category model
const Category = mongoose.model("Category", categorySchema);

// validate create category
const validateCreateCategory = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().required(),
  });

  return schema.validate(obj);
};

module.exports = {
  Category,
  validateCreateCategory,
};
