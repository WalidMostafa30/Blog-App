const multer = require("multer");
const path = require("path");

const photoStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename(req, file, cb) {
    if (file) {
      cb(null, `${Date.now()}${file.originalname}`);
    } else {
      cb(null, false);
    }
  },
});

// photo upload middleware
const photoUpload = multer({
  storage: photoStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
      return cb(new Error("Only images are allowed"));
    }
  },
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
});

module.exports = photoUpload;
