//questionRoute

const express = require("express");
const router = express.Router();

const { newQuestion , allQuestions, singleQuestion} = require("../controller/questionController");

const authMiddleware = require("../middleware/authMiddleWare");
// new question route
router.post("/new-question", newQuestion);

// all questions route
router.get("/all-questions", allQuestions);

//single question route
router.get("/single-question/:qid", singleQuestion);

module.exports = router;
