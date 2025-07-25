const mongoose = require("mongoose");
const joi = require("joi");

// comment schema
const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// comment model
const Comment = mongoose.model("Comment", commentSchema);

// validate create comment
const validateCreateComment = (obj) => {
  const schema = joi.object({
    postId: joi.string().required().label("post Id"),
    text: joi.string().trim().required(),
  });

  return schema.validate(obj);
};

// validate update comment
const validateUpdateComment = (obj) => {
  const schema = joi.object({
    text: joi.string().trim().required(),
  });

  return schema.validate(obj);
};

module.exports = {
  Comment,
  validateCreateComment,
  validateUpdateComment,
};
