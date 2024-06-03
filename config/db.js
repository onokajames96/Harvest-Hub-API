const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const atlasUri = process.env.MONGODB_ATLAS_URI;
const localUri = process.env.MONGODB_LOCAL_URI;

const connectDB = async () => {
	try {
    // Try connecting to MongoDB Atlas
    console.log("Attempting to Connect to MongoDB Atlas...")
    await mongoose.connect(atlasUri);
    console.log("Connected Successfully to MongoDB Atlas");
  } catch (err) {
    console.error("Failed to Connect to MongoDB Atlas... " +
	    "Attempting to Connect to Local MongoDB..");
    try {
      // Fallback to local MongoDB
      await mongoose.connect(localUri);
      console.log("Connected Successfully to Local MongoDB");
    } catch (localErr) {
      console.error("Failed to Connect to Local MongoDB..." + "Ensure Mongod Service is Running and Database Configured Correctly...");
      throw localErr; // If both connections fail, throw an error
    }
  }
}

module.exports = connectDB;
