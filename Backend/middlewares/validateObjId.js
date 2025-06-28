const mongoose = require("mongoose");

// validate object id
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  next();
};

module.exports = validateObjectId;
