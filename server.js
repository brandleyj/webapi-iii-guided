const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const morgan = require("morgan");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// function logger(req, res, next) {
// 	console.log(
// 		`The Logger: [${new Date().toISOString()}] ${req.method} to ${
// 			req.originalUrl
// 		}  `
// 	);

// 	next();
// }

function gateKeeper(req, res, next) {
	// date can come in the body, url params, query string, headers
	//new way of reading data sent by the client
	const password = req.headers.password || "";
	if (!password) {
		res.status(400).json({ message: "You shall not pass!" });
	} else if (password.toLowerCase() === "melon") {
		next();
	} else {
		res.status(401).json({ you: "cannot pass!!" });
	}
}

// Global Middleware
server.use(helmet()); // third party
server.use(express.json()); // built-in
server.use(gateKeeper);
// server.use(logger); // custom middleware
server.use(morgan("dev"));

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
	const nameInsert = req.name ? ` ${req.name}` : "";

	res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
