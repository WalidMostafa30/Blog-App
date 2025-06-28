const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB (^_^)");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = connectDB;