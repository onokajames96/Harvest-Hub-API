const app = require('./app'); // Import the Express app
const connectDB = require('./config/db'); // Import the database connection function

const PORT = process.env.PORT || 3000; // Define the port number, using environment variable or default to 3000


/**
 * Connect to MongoDB and start the Express server.
 */
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}).catch(err => {
	console.error("Failed to Connect to MongoDB...!", err);
	process.exit(1); // Exit the process with failure if the database connection fails
});
