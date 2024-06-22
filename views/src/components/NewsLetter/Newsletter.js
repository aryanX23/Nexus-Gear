import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faDiscord, faGithub, faDribbble } from '@fortawesome/free-brands-svg-icons';

import "./Newsletter.css";

const Newsletter = () => {
	const [email, setEmail] = useState();

	const handleChange = (event) => {
		setEmail(event.target.value);
	};
	
	return (
		<div className="newsletter-section">
			<div className="newsletter-content">
				<span className="font-normal text-center  text-xl text-indigo-900">Newsletter</span>
                <br />
				<span className="font-bold text-3xl  text-blue-100 mx-3">
					Sign up for latest updates and offers
				</span>
				<div className="form">
					<input
						type="text"
						name="email"
						placeholder="Email Address"
						value={email}
						onChange={handleChange}
					/>
					<button className="btn submit-button mx-5 rounded-md p-3">Subscribe</button>
				</div>
				<span className="text">
					Will be used in accordance with our Privacy Policy
				</span>
                <br />
				<span className="social-icons">
					<div className="icon">
						<FontAwesomeIcon icon={faDribbble} size={"lg"} />
					</div>
					<div className="icon">
						<FontAwesomeIcon icon={faFacebook} size={"lg"} />
					</div>
					<div className="icon">
						<FontAwesomeIcon icon={faGithub} size={"lg"} />
					</div>
					<div className="icon">
						<FontAwesomeIcon icon={faDiscord} size={"lg"} />
					</div>
				</span>
			</div>
		</div>
	);
};

export default Newsletter;