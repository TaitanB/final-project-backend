const express = require("express");

const { addPet, deletePet } = require("../../controllers/pets");

const petSchema = require("../../schemas/pet");
const { validateBody } = require("../../decorators");
const {
  unauthorized,
  isValidId,
  uploadImage,
  parseBody,
} = require("../../middlewares");

const router = express.Router();

router.patch(
  "/",
  unauthorized,
  uploadImage.single("pet"),
  parseBody,
  validateBody(petSchema),
  addPet
);

router.patch("/:id", unauthorized, isValidId, deletePet);

module.exports = router;
