const express = require("express");
const { getPages } = require("../controllers/heatmapController");

const router = express.Router();

router.get("/", getPages);

module.exports = router;
