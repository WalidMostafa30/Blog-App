const mongoose = require("mongoose");
const joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");
const jwt = require("jsonwebtoken");

// user schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual posts
UserSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

// generate token
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
  return token;
};

// user model
const User = mongoose.model("User", UserSchema);

// validate register user
const validateRegisterUser = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(3).max(100).required(),
    email: joi.string().trim().min(5).max(200).email().required(),
    password: joi.string().trim().min(8).required(),
    // password: passwordComplexity().required(),
  });
  return schema.validate(obj);
};

// validate login user
const validateLoginUser = (obj) => {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(200).email().required(),
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
};

// validate update user
const validateUpdateUser = (obj) => {
  const schema = joi.object({
    username: joi.string().trim().min(3).max(100),
    password: joi.string().trim().min(8),
    bio: joi.string().trim(),
  });
  return schema.validate(obj);
};

// validate reset password
const validateResetPassword = (obj) => {
  const schema = joi.object({
    password: joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
};

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateResetPassword,
  validateUpdateUser,
};
