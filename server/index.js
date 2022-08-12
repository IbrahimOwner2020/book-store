const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.get("/", (req, res) => {
	res.send("Server for Book list Project has started");
});

app.listen(4000, () => {
	console.log("Server is running on port 4000");
});

module.exports = app;
