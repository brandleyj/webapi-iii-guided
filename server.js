const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function dateLogger(req, res, next) {
	console.log(new Date().toISOString());

	next();
}

function URLLogger(req, res, next) {
	console.log(`${req.method} ${req.originalUrl}`);

	next();
}

// Global Middleware
server.use(helmet()); // third party
server.use(express.json()); // built-in
server.use(dateLogger); // custom middleware
server.use(URLLogger);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
	const nameInsert = req.name ? ` ${req.name}` : "";

	res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
