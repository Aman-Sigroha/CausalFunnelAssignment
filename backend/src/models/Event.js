const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    eventType: {
      type: String,
      required: true,
      enum: ["page_view", "click"],
    },
    pageUrl: { type: String, required: true, index: true },
    timestamp: { type: Date, required: true, index: true },
    clickX: { type: Number, default: null },
    clickY: { type: Number, default: null },
    userAgent: { type: String, default: null },
    viewportWidth: { type: Number, default: null },
    viewportHeight: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
