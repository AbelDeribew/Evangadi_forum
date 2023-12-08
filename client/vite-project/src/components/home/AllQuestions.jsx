import React, { useEffect, useState, useContext } from "react";
import "./AllQuestions.css";
import axios from "./axios";
import { stateValue } from "./context";
import { Link, useNavigate } from "react-router-dom";
import img from "./image/img1.png";

function AllQuestions() {
	let { username, setusername } = useContext(stateValue);
	let navigate = useNavigate();
	//get token from local storage
	const token = localStorage.getItem("token");

	//state to store the questions from the server
	let [question, setQuestion] = useState([]);

	useEffect(() => {
		try {
			axios
				.get("/questions/all-questions", {
					headers: {
						authorization: "Bearer " + token,
					},
				})
				.then((response) => {
					setQuestion(response?.data.allQuestion);
				})
				.catch((error) => {
					console.error("Error:", error);
					navigate("/");
				});
		} catch (error) {
			console.log(error);
		}
	}, []);

	function click(singleQ) {
		navigate = navigate("/Singlequestion/" + singleQ?.questionid);
	}

	function search(e) {
		try {
			axios
				.get("/questions/all-questions", {
					headers: {
						authorization: "Bearer " + token,
						search: e.target.value,
					},
				})
				.then((response) => {
					if (response.data.serachQuestions) setQuestion(response.data.serachQuestions);
					else setQuestion(response.data.allQuestion);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="main container">
			<div className="flexWrapper row justify-content-between">
				<button
					className="Abutton col-12 col-sm-3"
					onClick={() => navigate("/askquestion")}
				>
					Ask Question
				</button>
				<input
					type="text"
					placeholder="Search Questions"
					className="Ainput col-12 col-sm-3"
					onChange={search}
				/>
				<h4 className="col-12 col-sm-3">Welcome: {username}</h4>
			</div>

			<div className="allQuestions">
				<h2>Questions</h2>
				{question?.map((singleQuestion) => {
					let theQuestion = (
						<div className="questions" onClick={() => click(singleQuestion)}>
							<div className="width">
								<img className="questionImage" src={img} alt="" />
								<p>{singleQuestion?.username}</p>
							</div>

							<h4>{singleQuestion?.title}</h4>
						</div>
					);
					return theQuestion;
				})}
			</div>
		</div>
	);
}

export default AllQuestions;
