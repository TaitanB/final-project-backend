const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { fieldname, originalname } = file;

    const userId = req.user._id;

    let folder;
    let transformation;

    if (fieldname === "avatar") {
      folder = "avatars";
      transformation = [
        { width: 182, height: 182, crop: "thumb" },
        { quality: "auto:best" },
      ];
    } else if (fieldname === "notice") {
      folder = "notices";
      transformation = [{ width: 336, height: 288 }, { quality: "auto:best" }];
    } else if (fieldname === "pet") {
      folder = "pets";
      transformation = [
        { width: 240, height: 240, crop: "thumb" },
        { quality: "auto:best" },
      ];
    } else {
      folder = "misc";
      transformation = [{ width: 240, height: 240 }, { quality: "auto:best" }];
    }

    const uniqueFileName = `${userId}_${originalname}`;

    return {
      folder: folder,
      allowed_formats: ["jpg", "jpeg", "png", "bmp"],
      public_id: uniqueFileName,
      transformation: transformation,
    };
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = uploadImage;
