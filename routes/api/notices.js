const express = require("express");
const isValidId = require("../../middlewares/isValidId");

const {
  getAll,
  getById,
  add,
  addFavorite,
  deleteById,
  getAllOwner,
  deleteFavorite,
  getFavorite,
} = require("../../controllers/notices");

const noticeSchema = require("../../schemas/notice");
const { validateBody } = require("../../decorators");
const { unauthorized, uploadImage, parseBody } = require("../../middlewares");

const router = express.Router();

router.get("/", getAll);

router.get("/owner", unauthorized, getAllOwner);

router.get("/favorite", unauthorized, getFavorite);

router.get("/:id", unauthorized, isValidId, getById);

router.post(
  "/owner",
  unauthorized,
  uploadImage.single("notice"),
  parseBody,
  validateBody(noticeSchema),
  add
);

router.patch("/favorite/add/:id", unauthorized, isValidId, addFavorite);

router.patch("/favorite/delete/:id", unauthorized, isValidId, deleteFavorite);

router.delete("/:id", unauthorized, isValidId, deleteById);

module.exports = router;
