// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../utils/cloudinary");
// const HttpError = require("../helpers/HttpError");

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
