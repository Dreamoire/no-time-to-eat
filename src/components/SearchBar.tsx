import "../styles/SearchBar.css";

export function SearchBar() {
	return (
		<div className="search">
			<div className="search-switch">
				<span>Recette</span>
				<input type="checkbox" id="switch" name="switch" />
				<label htmlFor="switch">Recette</label>
			</div>
			<div className="search-bar">
				<input placeholder="Search a recipe" className="search-input" />
				<button type="button" className="search-btn">
					<img src="src/assets/images/search.png" alt="Search icon" />
				</button>
			</div>
		</div>
	);
}
