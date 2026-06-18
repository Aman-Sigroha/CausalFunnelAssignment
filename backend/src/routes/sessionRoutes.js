const express = require("express");
const {
  getSessions,
  getSessionById,
  getSessionStats,
} = require("../controllers/sessionController");

const router = express.Router();

router.get("/stats", getSessionStats);
router.get("/", getSessions);
router.get("/:id", getSessionById);

module.exports = router;
