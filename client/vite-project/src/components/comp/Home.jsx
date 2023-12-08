import React from 'react';
import "./Home.css";
import About from './About';
import RegisterAndLogin from './RegisterAndLogin';
function Home() {
  return (
		<div>
			<div className="mainHomeWrapper">
				<div className="homeComponents">
					<div className="container">
						<div className="row">
							<div className="col-12 col-md-6">
								<RegisterAndLogin />
							</div>
							<div className="col-12 col-md-6">
								<About />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
