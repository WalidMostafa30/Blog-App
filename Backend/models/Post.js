const mongoose = require("mongoose");
const joi = require("joi");

// post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual comments
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "postId",
  localField: "_id",
});

// post model
const Post = mongoose.model("Post", postSchema);

// validate create Post
const validateCreatePost = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(200).required(),
    description: joi.string().trim().min(5).required(),
    category: joi.string().trim().required(),
  });

  return schema.validate(obj);
};

// validate update Post
const validateUpdatePost = (obj) => {
  const schema = joi.object({
    title: joi.string().trim().min(3).max(200),
    description: joi.string().trim().min(5),
    category: joi.string().trim(),
  });

  return schema.validate(obj);
};

module.exports = {
  Post,
  validateCreatePost,
  validateUpdatePost,
};
