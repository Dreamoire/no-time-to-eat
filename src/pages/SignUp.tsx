import formateurs from "../assets/images/formateurs.png";
import "../styles/SignUp.css";

export default function SignUp() {
	return (
		<div className="signup-card">
			<p className="signup-error">Soon avalaible</p>
			<img alt="formateurs" src={formateurs} className="signup-image" />
		</div>
	);
}
