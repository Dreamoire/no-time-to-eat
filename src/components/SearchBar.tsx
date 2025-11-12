import { useState } from "react";
import "../styles/SearchBar.css";

export function SearchBar() {
	const [searchType, setSearchType] = useState<"recipe" | "ingredient">(
		"recipe",
	);
	return (
		<div className="search">
			<div
				className="search-switch"
				style={{
					backgroundColor:
						searchType === "recipe"
							? "var(--bg-color-brightred)"
							: "var(--bg-color-darkred)",
				}}
			>
				<span>{searchType === "recipe" ? "Recipe" : "Ingredient"}</span>
				<input
					type="checkbox"
					checked={searchType === "ingredient"}
					id="switch"
					name="switch"
					onClick={() =>
						setSearchType(searchType !== "recipe" ? "recipe" : "ingredient")
					}
				/>
				<label htmlFor="switch">""</label>
			</div>

			<div className="search-bar">
				<input
					placeholder={
						searchType === "recipe"
							? "Search a recipe"
							: "Enter your ingredients"
					}
					className="search-input"
				/>
				<button type="button" className="search-btn">
					<img src="src/assets/images/search.png" alt="Search icon" />
				</button>
			</div>
		</div>
	);
}
