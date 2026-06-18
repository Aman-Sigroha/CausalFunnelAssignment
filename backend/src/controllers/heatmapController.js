const Event = require("../models/Event");

const getHeatmapData = async (req, res) => {
  try {
    const { page } = req.query;

    if (!page) {
      return res.status(400).json({ error: "page query parameter is required" });
    }

    const clicks = await Event.find({
      eventType: "click",
      pageUrl: page,
      clickX: { $ne: null },
      clickY: { $ne: null },
    })
      .select("clickX clickY sessionId timestamp viewportWidth viewportHeight")
      .lean();

    res.json(clicks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPages = async (req, res) => {
  try {
    const pages = await Event.distinct("pageUrl");
    res.json(pages.sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getHeatmapData, getPages };
