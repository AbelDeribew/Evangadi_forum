import React, { useState } from "react";
import "./AskQuestion.css";
import { Link } from "react-router-dom";
import axios from "./axios";
function AskQuestion() {
	//state to store question title from the user
	let [titleValue, setTitleValue] = useState("");
	//state to store discription from the user
	let [discriptionValue, setDiscriptionValue] = useState("");
	//state to store server response
	let [questionResponse, setQuestionResponse] = useState("");

	function submit(e) {
		e.preventDefault();
		if(!titleValue || ! discriptionValue){
			return setQuestionResponse("Question title or Discrtiption can not be empty")
		}
		const token = localStorage.getItem("token");
		try {
			console.log("token ", token);
			axios
				.post(
					"/questions/new-question",
					{
						title: titleValue,
						description: discriptionValue,
					},
					{
						headers: {
							authorization: "Bearer " + token,
						},
					}
				)
				.then((response) => {
					setQuestionResponse(response.data.msg);
					e.target.reset();
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className="">
			<div className="askQuestion">
				<h2>Steps to write a good question</h2>

				<ul className="">
					<li>Summerize your problem in a one-line title.</li>
					<li>Describe your problem in more detail.</li>
					<li>Describe what you tried and what you expected to happen.</li>
					<li>Review your question and post it to the site.</li>
				</ul>
			</div>

			<div className="askQuestion">
				<br />
				<br />
				<br />
				<br />
				<h2>Ask a public question</h2>
				<Link to="/allquestion">
					<p>Go to Question page</p>
				</Link>

				<br />
				<h1 className="blue">{questionResponse}</h1>
			</div>

			<form onSubmit={submit}>
				<div className="askQuestion">
					<input
						className="textArea"
						onChange={(e) => setTitleValue(e.target.value)}
						type="text"
						placeholder="Title"
					/>
					<br />

					<textarea
						className="textArea"
						onChange={(e) => setDiscriptionValue(e.target.value)}
						name=""
						id=""
						cols=""
						rows=""
						placeholder="Question description..."
					></textarea>
					<br />
					<button className="allQuestion-button" type="submit">
						Post Your Question
					</button>
				</div>
			</form>
		</div>
	);
}

export default AskQuestion;
