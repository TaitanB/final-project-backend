const express = require("express");

const { getFriends } = require("../../controllers/getFriends");

const router = express.Router();

router.get("/", getFriends);

module.exports = router;
