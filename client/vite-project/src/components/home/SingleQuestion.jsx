import React, { useContext, useEffect, useState } from "react";
import "./SingleQuestion.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "./image/img1.png";
import axios from "./axios";
function SingleQuestion() {
	let navigate = useNavigate();
	//state to store question from server
	const [question, setQuestion] = useState({});

	//state to store answer from server
	const [answer, setAnswer] = useState([]);

	//state to store user answer
	const [userAnswer, setUserAnswer] = useState("");

	//state to store answer response from server
	const [postResponse, setPostResponse] = useState("");

	//get the url param to fetch the specific question
	const { questionId } = useParams();
	const token = localStorage.getItem("token");

	useEffect(() => {
		//fetch to get single question title and description
		try {
			axios
				.get("/questions/single-question/" + questionId, {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setQuestion(response?.data?.oneQuestion[0]);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log(error);
		}


			try {
				axios
					.get("/answers/getanswer/" + questionId, {
						headers: {
							authorization: "Bearer " + token,
						},
					})
					.then((response) => {
						setAnswer(response?.data?.allAnswer);
					})
					.catch((error) => {
						console.error("Error:", error);
						navigate("/");
					});
			} catch (error) {
				console.log(error);
			}
	}, []);

	function questionAnswer(e) {
		e.preventDefault();
		if (userAnswer) {
			setUserAnswer("");
				console.log("token ", token);
				axios
					.post(
						"/answers/postanswer/" + questionId,
						{
							answer: userAnswer,
						},
						{
							headers: {
								authorization: "Bearer " + token,
							},
						}
					)
					.then((response) => {
						setPostResponse(response.data.msg);
						e.target.reset();
					})
					.catch((err) => {
						console.log(err);
					});
		}else {
			return setPostResponse("answer can't be empty");
		}
	}

	return (
		<div className="mainQuestionWrapper container">
			<div>
				<h1>Question</h1>
			</div>
			<div>
				<h4>{question?.title}</h4>
			</div>
			<div className="singleQDescritpion">
				<p>{question?.description}</p>
			</div>
			<h2 className="community">Answer From The Community</h2>
			{answer?.map((singleAnswer) => {
				let theAnswers = (
					<div className="singleQAnswers">
						<div className="width">
							<img className="questionImage" src={img} alt="" />
							<p>{singleAnswer.username}</p>
						</div>
						<div>
							<h4>{singleAnswer?.answer}</h4>
						</div>
					</div>
				);
				return theAnswers;
			})}

			<div className="questionAnswer">
				<h2>Answer The Top Question</h2>
				<Link to="/allquestion">
					<p>Go to Question page</p>
				</Link>

				<h2 className="blue">{postResponse}</h2>

				<form onSubmit={questionAnswer}>
					<textarea
						className="textArea"
						onChange={(e) => setUserAnswer(e.target.value)}
						name=""
						id=""
						cols=""
						rows=""
						placeholder="Answer description..."
					></textarea>
					<button className="questionAnswer-button" type="submit">
						Post Your Answer
					</button>
				</form>
			</div>
		</div>
	);
}

export default SingleQuestion;
