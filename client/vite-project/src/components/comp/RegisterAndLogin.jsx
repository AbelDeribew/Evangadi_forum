import React, { useContext, useEffect, useState } from "react";
import "./RegisterAndLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { stateValue } from "../home/context";
import axios from "../home/axios";
function RegisterAndLogin() {
	const navigate = useNavigate();

	let { username, setusername } = useContext(stateValue);
	useEffect(() => {
		setusername("");
		localStorage.setItem("token", "");
	}, []);

	//to toggle the register and login form
	//updated toogle
	let [firstToogle, setFirstToggle] = useState(true);
	function registerAndLoginToogler() {
		setFirstToggle(!firstToogle);
	}

	//states to store register data
	let [registerResponse, setRegisterResponse] = useState("");
	let [email, setEmail] = useState("");
	let [firstName, setFirstName] = useState("");
	let [lastName, setLastName] = useState("");
	let [userName, setUserName] = useState("");
	let [password, setPassword] = useState("");
	function agreeAndJoinHandler(e) {
		e.preventDefault();
		try {
			axios
				.post("/users/register", {
					email: email,
					firstname: firstName,
					lastname: lastName,
					username: userName,
					password: password,
				})
				.then((response) => {
					setRegisterResponse(response.data.msg);
					if (response.data.msg == "user registered") {
						e.target.reset();
						setTimeout(() => {
							window.location.reload();
						}, 2000);
					}
				})
				.catch((error) => {
					console.error("Error:", error);
					setRegisterResponse(error.response.data.msg);
				});
		} catch (error) {
			console.log(error);
		}
	}

	//states to store login data
	let [loginResponse, setLoginResponse] = useState("");
	let [loginEmail, setLoginEmail] = useState("");
	let [loginPassword, setLoginPassword] = useState("");
	function loginHandler(e) {
		e.preventDefault();
		try {
			axios
				.post("/users/login", {
					email: loginEmail,
					password: loginPassword,
				})
				.then((response) => {
					setLoginResponse(response.data.msg);
					const token = response.data.token;
					localStorage.setItem("token", token);
					if (response.data.msg == "user login successfuly") {
						navigate("/allquestion");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
					setLoginResponse(error.response.data.msg);
				});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="container">
			<div className="row">
				{/* register */}
				<form onSubmit={agreeAndJoinHandler}>
					<div className={`${firstToogle ? "display" : ""}`}>
						<div className="mainRegisterWrapper">
							<div className="secondRegisterWrapper">
								<div className="joinNetwork">
									<h3 className="textCenter">Join the network</h3>
									<p className="textCenter">
										Already have an account?{" "}
										<span className="orange" onClick={registerAndLoginToogler}>
											Sign in
										</span>
									</p>
								</div>

								<h5 className="red">{registerResponse}</h5>

								<div className="inputs">
									<input
										type="email"
										placeholder="Email"
										name="email"
										onChange={(e) => setEmail(e.target.value)}
									/>
									<br />
									<div className="firstAndLastName">
										<input
											type="text"
											placeholder="First Name"
											onChange={(e) => setFirstName(e.target.value)}
										/>
										<br />
										<input
											type="text"
											placeholder="Last Name"
											onChange={(e) => setLastName(e.target.value)}
										/>
									</div>

									<br />
									<input
										type="text"
										placeholder="User Name"
										onChange={(e) => setUserName(e.target.value)}
									/>
									<br />
									<input
										type="password"
										placeholder="Password"
										onChange={(e) => setPassword(e.target.value)}
									/>
									<div className="textCenter">
										<button className="button" type="submit">
											Agree and Join
										</button>
									</div>

									<p className="textCenter">
										I agree to the <Link>privacy policy</Link> and{" "}
										<Link>terms of service.</Link>
									</p>
									<p className="textCenter">
										<br />
										<p className="orange" onClick={registerAndLoginToogler}>
											Already have an account?
										</p>
									</p>
								</div>
							</div>
						</div>
					</div>
				</form>

				{/* login */}
				<div
					className={`${firstToogle ? "" : "display"}`}>
					<div className="mainRegisterWrapper">
						<div className="secondRegisterWrapper">
							<div className="joinNetwork">
								<h3 className="textCenter">Login to your account</h3>
								<p className="textCenter">
									Don’t have an account?
									<span className="orange" onClick={registerAndLoginToogler}>
										Create a new account
									</span>
								</p>
							</div>

							<div className="inputs">
								<input
									type="email"
									placeholder="Email"
									onChange={(e) => setLoginEmail(e.target.value)}
								/>
								<br />
								<input
									type="password"
									placeholder="Password"
									onChange={(e) => setLoginPassword(e.target.value)}
								/>
								<p className="forgetPass orange">Forgot password?</p>
								<div className="textCenter">
									<button className="button loginButton" onClick={loginHandler}>
										Login
									</button>
								</div>
								<h5 className="red">{loginResponse}</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterAndLogin;
