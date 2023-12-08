import React from 'react';
import "./Footer.css";
import img from "../home/image/img3.png";
function Footer() {
  return (
		<div className="mainFooterWrapper container-fluid">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-4">
						<img src={img} alt="evangadi logo" />
					</div>

					<div className="col-12 col-md-4">
						<ul className="footer">
							<li>
								<h3>Useful Link</h3>
							</li>
							<div className="color">
								<li>How it works</li>
								<li>Terms of Service</li>
								<li>Privacy policy</li>
							</div>
						</ul>
					</div>

					<div className="col-12 col-md-4">
						<ul className="footer">
							<li>
								<h3>Contact Info</h3>
							</li>
							<div className="color">
								<li>Evangadi Networks</li>
								<li>support@evangadi.com</li>
								<li>+1-202-386-2702</li>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Footer;
