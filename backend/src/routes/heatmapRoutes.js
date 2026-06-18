const express = require("express");
const { getHeatmapData } = require("../controllers/heatmapController");

const router = express.Router();

router.get("/", getHeatmapData);

module.exports = router;
