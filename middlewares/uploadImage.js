const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");
// const HttpError = require("../helpers/HttpError");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;

    if (file.fieldname === "avatars") {
      folder = "avatars";
    } else if (file.fieldname === "notices") {
      folder = "notices";
    } else {
      folder = "misc";
    }

    return {
      folder: folder,
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: file.originalname,
      transformation: [
        { width: 182, height: 182, crop: "thumb" },
        { quality: "auto:best" },
      ],
    };
  },
});

const uploadImage = multer({ storage });

module.exports = uploadImage;

// controller
// const someFunc = async (req, res) => {
//   const avatarURL = req.file.path;
// };

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "avatars",
//     allowed_formats: ["jpg", "png", "jpeg", "gif"],
//     transformation: [
//       {
//         width: 250,
//         height: 250,
//         crop: "thumb",
//       },
//       { quality: "auto:best" },
//     ],
//   },
// });

// const fileFilter = function (req, file, cb) {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only images are allowed."), false);
//   }
// };

// function uploadImage(req, res, next) {
//   const upload = multer({
//     storage: storage,
//     limits: { fileSize: 3 * 1024 * 1024 },
//     fileFilter: fileFilter,
//   }).single("avatar");

//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return next(HttpError(err.http_code, err.message));
//     } else if (err) {
//       return next(HttpError(err.http_code, err.message));
//     }
//     next();
//   });
// }

// module.exports = uploadImage;
