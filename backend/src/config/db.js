const mongoose = require("mongoose");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/causalfunnel-analytics";
  const timeout = process.env.NODE_ENV === "production" ? 30000 : 5000;

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: timeout,
    family: 4,
  });

  console.log("MongoDB connected");
};

module.exports = connectDB;
