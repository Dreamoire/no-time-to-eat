import { useState } from "react";
import { Link } from "react-router";
import "../styles/NavBar.css";

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleToggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const handleCloseMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav className="global-nav">
			<Link to="/" className="nav-logo" onClick={handleCloseMenu}>
				<img
					src="/src/assets/images/logo.png"
					alt="logo"
					className="logo-image"
				/>
			</Link>

			<button
				type="button"
				className={`burger-button ${isMenuOpen ? "burger-button--open" : ""}`}
				aria-label="Toggle navigation menu"
				onClick={handleToggleMenu}
			>
				<span className="burger-line" />
				<span className="burger-line" />
				<span className="burger-line" />
			</button>

			<ul className={`nav-links ${isMenuOpen ? "nav-links--open" : ""}`}>
				<li>
					<Link to="/" onClick={handleCloseMenu}>
						Sign up
					</Link>
				</li>
				<li>
					<Link to="/blog" onClick={handleCloseMenu}>
						Blog
					</Link>
				</li>
				<li>
					<Link to="/favorite" onClick={handleCloseMenu}>
						Favorites
					</Link>
				</li>
			</ul>
		</nav>
	);
}
