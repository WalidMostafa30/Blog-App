const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary upload image
const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const result = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error (Cloudinary)");
  }
};

// cloudinary delete image
const cloudinaryDeleteImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error (Cloudinary)");
  }
};

// cloudinary delete multiple image
const cloudinaryDeleteMultipleImage = async (imagesPublicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(imagesPublicIds);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error (Cloudinary)");
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryDeleteImage,
  cloudinaryDeleteMultipleImage,
};
