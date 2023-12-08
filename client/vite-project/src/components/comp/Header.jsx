import React, { useContext, useState } from 'react';
import "./Header.css";
import img from "../home/image/img2.png";
import { Link, useNavigate } from 'react-router-dom';
import { stateValue } from '../home/context';
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
	let [phoneLogout,setPhoneLogout]=useState(false);
	let navigate=useNavigate();
	let { username, setusername } = useContext(stateValue);
	function logoutHandler(){
		localStorage.setItem("token", "");
		setusername("");
		navigate("/");
		window.location.reload();
	}
	function hamHandler(){
		if(username) setPhoneLogout(!phoneLogout);
	}
  return (
		<div>
			<div className="mainHeaderWrapper container justify-content-between">
				<div className="row">
					<div className="col-10 col-md-6">
						<Link to="/allquestion">
							<img className="evangadiImage" src={img} alt="evangadi logo" />
						</Link>
					</div>
					<div className="col-1 d-md-none">
						<MenuIcon className="" onClick={hamHandler} />
					</div>
					<div className="d-none d-md-block col-md-6">
						<ul className="lists ">
							<li >Home</li>
							<li >How it works</li>
							<div className="">
								<li>
									{username ? (
										<button className="button" onClick={logoutHandler}>
											Logout
										</button>
									) : (
										<button className="button">Login</button>
									)}
								</li>
							</div>
						</ul>
					</div>
				</div>
				<div className="phoneLogout d-md-none">
					<button
						onClick={logoutHandler}
						className={`${phoneLogout ? "" : "display"}`}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

export default Header;
