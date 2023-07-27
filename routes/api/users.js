const express = require("express");

const {
  register,
  login,
  logout,
  currentUser,
  updateUserData,
} = require("../../controllers/auth");
const { uploadImage, parseBody } = require("../../middlewares");
const {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
} = require("../../schemas/users");

const { validateBody } = require("../../decorators");
const { unauthorized } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(userRegisterSchema), register);

router.post("/login", validateBody(userLoginSchema), login);

router.post("/logout", unauthorized, logout);

router.get("/current", unauthorized, currentUser);

router.put(
  "/",
  unauthorized,
  uploadImage.single("avatar"),
  parseBody,
  validateBody(userUpdateSchema),
  updateUserData
);

module.exports = router;
