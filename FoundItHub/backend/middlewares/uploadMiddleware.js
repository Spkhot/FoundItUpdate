// middlewares/uploadMiddleware.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // ✅ REUSE config

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "found_items",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });
module.exports = upload;
