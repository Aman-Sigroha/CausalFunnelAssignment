const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const {
      sessionId,
      eventType,
      pageUrl,
      timestamp,
      clickX,
      clickY,
      userAgent,
      viewportWidth,
      viewportHeight,
    } = req.body;

    if (!sessionId || !eventType || !pageUrl) {
      return res.status(400).json({ error: "sessionId, eventType, and pageUrl are required" });
    }

    const event = await Event.create({
      sessionId,
      eventType,
      pageUrl,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      clickX: clickX ?? null,
      clickY: clickY ?? null,
      userAgent: userAgent ?? null,
      viewportWidth: viewportWidth ?? null,
      viewportHeight: viewportHeight ?? null,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createEvent };
