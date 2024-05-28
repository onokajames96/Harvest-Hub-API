const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const atlasUri = process.env.MONGODB_ATLAS_URI;
const localUri = process.env.MONGODB_LOCAL_URI;

const connectDB = async () => {
	try {
    // Try connecting to MongoDB Atlas
    await mongoose.connect(atlasUri);
    console.log("Connected successfully to MongoDB Atlas");
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas, " +
	    "attempting to connect to local MongoDB");
    try {
      // Fallback to local MongoDB
      await mongoose.connect(localUri);
      console.log("Connected successfully to local MongoDB");
    } catch (localErr) {
      console.error("Failed to connect to local MongoDB", localErr);
      throw localErr; // If both connections fail, throw an error
    }
  }
}

module.exports = connectDB;
