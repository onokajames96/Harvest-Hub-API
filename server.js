const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and Start Server
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}).catch(err => {
	console.error("Failed to Connect to MongoDB...!", err);
	process.exit(1);
});
