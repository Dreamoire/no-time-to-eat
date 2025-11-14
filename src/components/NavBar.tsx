import "../styles/NavBar.css";

export default function NavBar() {
	return (
		<nav className="global-nav">
			<a href="/" className="nav-logo">
				<img
					src="/src/assets/images/logo.png"
					alt="logo"
					className="logo-image"
				/>
			</a>
			<ul className="nav-links">
				<li>
					<a href="/signup">Sign up</a>
				</li>
				<li>
					<a href="/blog">Blog</a>
				</li>
				<li>
					<a href="/favorites">Favorites</a>
				</li>
			</ul>
		</nav>
	);
}
