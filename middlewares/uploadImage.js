const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { fieldname, originalname } = file;

    const userId = req.user._id;

    let folder;
    let transformation = [
      // { width: 336, crop: "scale" },
      { quality: "auto:best" },
    ];

    if (fieldname === "avatar") {
      folder = "avatars";
      transformation = [
        { width: 182, height: 182, crop: "thumb" },
        { quality: "auto:best" },
      ];
    } else if (fieldname === "notice") {
      folder = "notices";
    } else if (fieldname === "pet") {
      folder = "pets";
    } else {
      folder = "misc";
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
