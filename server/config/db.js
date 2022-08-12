const mongoose = require("mongoose");

const connectDB = async () => {
	await mongoose
		.connect(process.env.MONGO_URI)
		.then((conn) =>
			console.log(`MongoDB connected: ${conn.connection.host}`)
		)
		.catch((error) => {
			console.log(`MongoDB connection error: ${error.message}`);
			console.log(error);
		});
};

module.exports = connectDB;
