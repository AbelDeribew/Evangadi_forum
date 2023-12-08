require("dotenv").config();
const express = require("express");
const router = require("./routes/userRoutes");
const path = require("path");
const app = express();
const dbConnection = require("./db/dbConfig");
const authMiddleware = require("./middleware/authMiddleWare");
const cors = require("cors");

app.use(express.json());

app.use(cors());

//Question route
app.use("/api/users", router);

// Questions routes and middleware
const questionRotes = require("./routes/questionRoutes");
app.use("/api/questions", authMiddleware, questionRotes);

//Answers rotes and middleware
const answersRoute = require("./routes/answerRoute");
app.use("/api/answers", authMiddleware, answersRoute);

async function start() {
	try {
		const result = await dbConnection.execute("select 'test'");
		await app.listen(1234);
		console.log(result[0]);
	} catch (error) {
		console.log(error.message);
	}
}

start();
