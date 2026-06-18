const Event = require("../models/Event");

const getSessions = async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$sessionId",
          eventCount: { $sum: 1 },
          firstVisit: { $min: "$timestamp" },
          lastVisit: { $max: "$timestamp" },
        },
      },
      { $sort: { lastVisit: -1 } },
      {
        $project: {
          _id: 0,
          sessionId: "$_id",
          eventCount: 1,
          firstVisit: 1,
          lastVisit: 1,
        },
      },
    ]);

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSessionById = async (req, res) => {
  try {
    const events = await Event.find({ sessionId: req.params.id })
      .sort({ timestamp: 1 })
      .lean();

    if (events.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSessionStats = async (req, res) => {
  try {
    const [totalSessions, totalEvents, totalClicks] = await Promise.all([
      Event.distinct("sessionId").then((ids) => ids.length),
      Event.countDocuments(),
      Event.countDocuments({ eventType: "click" }),
    ]);

    res.json({ totalSessions, totalEvents, totalClicks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSessions, getSessionById, getSessionStats };
