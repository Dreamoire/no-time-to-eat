import "../styles/NavBar.css";
import { Link } from "react-router";

export default function NavBar() {
	return (
		<nav className="global-nav">
			<Link to="/" className="nav-logo">
				<img
					src="/src/assets/images/logo.png"
					alt="logo"
					className="logo-image"
				/>
			</Link>
			<ul className="nav-links">
				<li>
					<Link to="/">Sign up</Link>
				</li>
				<li>
					<Link to="/blog">Blog</Link>
				</li>
				<li>
					<Link to="/favorite">Favorites</Link>
				</li>
			</ul>
		</nav>
	);
}
