import React, { useEffect, useState } from "react";
import "./components/css/bootstrap.css";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/comp/Home";
import SharedPage from "./components/comp/SharedPage";
import NotFound from "./components/comp/NotFound";
import AllQuestions from "./components/home/AllQuestions";
import { stateValue } from "./components/home/context";
import SingleQuestion from "./components/home/SingleQuestion";
import AskQuestion from "./components/home/AskQuestion";
import axios from "./components/home/axios";

function App() {
	let [username, setusername] = useState("");
	const token = localStorage.getItem("token");
	console.log("this is the token", token);
	let navigate = useNavigate();

	try {
		axios
			.get("/users/check/", {
				headers: {
					authorization: "Bearer " + token,
				},
			})
			.then((response) => {
				if (response.data.username) {
					setusername(response.data.username);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	} catch (error) {
		console.log(error);
	}

	return (
		<>
			<stateValue.Provider value={{ username, setusername }}>
				<Routes>
					<Route path="/" element={<SharedPage />}>
						<Route path="/" element={<Home />} />
						<Route path="/allquestion" element={<AllQuestions />} />
						<Route path="*" element={<NotFound />} />
						<Route
							path="/singlequestion/:questionId"
							element={<SingleQuestion />}
						/>
						<Route path="/askquestion" element={<AskQuestion />} />
					</Route>
				</Routes>
			</stateValue.Provider>
			
		</>
	);
}

export default App;
