const express = require("express");

const { getNews } = require("../../controllers/getNews");

const router = express.Router();

router.get("/", getNews);

module.exports = router;
