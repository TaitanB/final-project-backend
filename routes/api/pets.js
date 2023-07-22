const express = require("express");

const { addPet, deletePet } = require("../../controllers/pets");

const petSchema = require("../../schemas/pet");
const { validateBody } = require("../../decorators");
const { unauthorized, isValidId } = require("../../middlewares");

const router = express.Router();

router.patch("/", unauthorized, validateBody(petSchema), addPet);

router.patch("/:id", unauthorized, isValidId, deletePet);

module.exports = router;
