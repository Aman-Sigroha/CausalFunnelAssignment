const mongoose = require("mongoose");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/causalfunnel-analytics";
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log("MongoDB connected");
};

module.exports = connectDB;
