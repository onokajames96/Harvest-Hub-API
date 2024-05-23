const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB Connection Successfull...!!!");
	} catch (error) {
		console.error("Error connecting to MongoDB...!!!", error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
