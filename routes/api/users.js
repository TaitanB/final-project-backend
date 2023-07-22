const express = require("express");

const {
  register,
  login,
  logout,
  current,
  updateUserData,
  // updateUserAvatar,
} = require("../../controllers/auth");
// const { uploadImage } = require("../../middlewares/uploadImage");
const { userRegisterSchema, userLoginSchema } = require("../../schemas/users");

const { validateBody } = require("../../decorators");
const { unauthorized } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(userRegisterSchema), register);

router.post("/login", validateBody(userLoginSchema), login);

router.post("/logout", unauthorized, logout);

router.get("/current", unauthorized, current);

router.put("/", unauthorized, updateUserData);

// router.patch(
//   "/avatars",
//   unauthorized,
//   uploadImage.single("avatar"),
//   updateUserAvatar
// );

// router.post("/user", unauthorized, upload.single("avatar"), addAvatar);
// router.post("/user", unauthorized, upload.single("recipeImg"), addAvatar);

module.exports = router;
