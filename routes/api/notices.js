const express = require("express");
const isValidId = require("../../middlewares/isValidId");

const {
  getAll,
  getById,
  add,
  updateStatus,
  deleteById,
} = require("../../controllers/notices");

const noticeSchema = require("../../schemas/notice");
const { validateBody } = require("../../decorators");
const { unauthorized } = require("../../middlewares");

const router = express.Router();

router.get("/", unauthorized, getAll);

router.get("/:id", unauthorized, isValidId, getById);

router.post("/", unauthorized, validateBody(noticeSchema), add);

router.patch("/:id/favorite", unauthorized, isValidId, updateStatus);

router.delete("/:id", unauthorized, isValidId, deleteById);

module.exports = router;
