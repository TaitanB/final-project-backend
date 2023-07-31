const express = require("express");

const {
  register,
  login,
  logout,
  currentUser,
  updateUserData,
  googleAuth,
} = require("../../controllers/auth");
const { uploadImage, parseBody, passport } = require("../../middlewares");
const {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
} = require("../../schemas/users");

const { validateBody } = require("../../decorators");
const { unauthorized } = require("../../middlewares");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

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
