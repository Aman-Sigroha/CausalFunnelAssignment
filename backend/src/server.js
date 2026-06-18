require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const heatmapRoutes = require("./routes/heatmapRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const rootDir = path.join(__dirname, "../..");

app.use(cors());
app.use(express.json());

app.use("/tracker", express.static(path.join(rootDir, "tracker")));
app.use("/demo-site", express.static(path.join(rootDir, "demo-site")));

app.get("/", (req, res) => {
  res.redirect("/demo-site/");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/events", eventRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/heatmap", heatmapRoutes);
app.use("/api/pages", pageRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
