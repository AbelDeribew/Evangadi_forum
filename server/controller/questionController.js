const dbConnection = require("../db/dbConfig");

const newQuestion = async (req, res) => {
	// Check if request body or required fields are missing
	if (!req.body || !req.body.title || !req.body.description) {
		return res
			.status(400)
			.json({ error: "Missing or incomplete data in the request body." });
	}

	// Destructure request body and extract title, description, and tag
	const { title, description, tag } = req.body;

	// Destructure the userid from the req.user object, which is set by the authentication middleware
	const { userid } = req.user;

	// Generate a unique questionid using a combination of timestamp and a random number
	const timestamp = Date.now();
	console.log("data now ", Date.now());
	const randomId = Math.floor(Math.random() * 1000);
	console.log("math floor and random number", Math.floor(Math.random() * 1000));
	const questionid = `${timestamp}${randomId}`;
	console.log(questionid);

	try {
		// Check if a question with the same title and description already exists
		const [existingQuestion] = await dbConnection.query(
			"SELECT title, description FROM questions_ WHERE title = ? AND description = ?",
			[title, description]
		);

		// If a similar question exists, return a 409 conflict response
		if (existingQuestion.length > 0) {
			return res.status(400).json({ existingQuestion });
			// .json({ error: "A similar question already exists" });
		}

		// Check if the description is not empty
		if (description.length <= 10) {
			return res.status(400).json({ error: "Description cannot be empty" });
		}

		// Insert the new question into the database with the generated questionid, title, description, userid, and tag
		await dbConnection.query(
			"INSERT INTO questions_ (questionid, title, description, user_id, tag) VALUES (?, ?, ?, ?, ?)",
			[questionid, title, description, userid, tag]
		);

		// Return a 201 created response if the question is successfully inserted
		return res.status(201).json({ msg: "Question submitted" });
	} catch (error) {
		// Log and return a 500 internal server error response if an error occurs
		console.log(error.message);
		res.status(500).json({ error: "Something went wrong, please try again" });
	}
};

async function allQuestions(req, res) {
	const { search } = req.headers;

	console.log(search);
	try {
		//serach question
		if(search){
			console.log("searched");
			let [serachQuestions] = await dbConnection.query(
				"SELECT * FROM questions_ WHERE title LIKE  concat('%' , ?, '%')",
				[search]
			);
			// console.log("serach questions",serachQuestions);
		return res.status(200).json({ serachQuestions });
	}


		//query username and all questions from the users and questions table
		console.log("all questions");
		let [allQuestion] = await dbConnection.query(
			`SELECT q.questionid, q.title, u.username FROM questions_ q JOIN users_ u ON q.user_id = u.userid  ORDER BY id DESC;`
		);
		return res.status(200).json({ allQuestion });
	} catch (error) {
		// Log and return a 500 internal server error response if an error occurs
		console.log(error.message);
		res.status(500).json({ msg: "Something went wrong, please try again" });
	}
}

async function singleQuestion(req, res) {
	const questionId = req.params.qid;

	//check if the question id is provided by the user
	if (!req.params.qid) {
		return res.status(400).json({ msg: "single question id not provided" });
	}

	try {
		//query to the database to select the question
		const [oneQuestion] = await dbConnection.query(
			"SELECT * FROM questions_ WHERE questionid = ?",
			[questionId]
		);

		//check if the provided question id is not in the database
		if (oneQuestion.length == 0) {
			return res
				.status(400)
				.json({ msg: "question not found with the provided id" });
		} else {
			//if the provided question id is exist on the database return the data
			// console.log(oneQuestion);
			res.send({ oneQuestion });
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Something went wrong, please try again" });
	}
}

module.exports = { newQuestion, allQuestions, singleQuestion };
