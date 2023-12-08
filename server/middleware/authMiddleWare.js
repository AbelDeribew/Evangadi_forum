const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { config } = require("../db/dbConfig");

async function authMiddleWare(req, res, next) {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: "token not provide" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const { username, userid } = jwt.verify(
			token,
			"4R9ccgz4Y8dyi1XdNkjKIgDupFVHXWrH"
		);
		req.user = { username, userid };
		next();
	} catch (error) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ msg: "Authentication Invalid" });
	}
}

module.exports = authMiddleWare;
