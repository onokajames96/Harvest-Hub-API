const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			//useNewUrlParser: true,
			//useUnifiedTopology: true,
			//useCreateIndex: true
		});
		console.log(`MongoDB Connection Successfull: ${conn.connection.host}`);
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
