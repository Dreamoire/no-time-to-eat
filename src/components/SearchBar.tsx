import { useEffect, useState } from "react";
import "../styles/SearchBar.css";

export type Meal = {
	idMeal: string;
	strMeal: string;
	strMealAlternate: string | null;
	strCategory: string | null;
	strArea: string | null;
	strInstructions: string | null;
	strMealThumb: string | null;
	strTags: string | null;
	strYoutube: string | null;

	// Ingredients 1–20
	strIngredient1: string | null;
	strIngredient2: string | null;
	strIngredient3: string | null;
	strIngredient4: string | null;
	strIngredient5: string | null;
	strIngredient6: string | null;
	strIngredient7: string | null;
	strIngredient8: string | null;
	strIngredient9: string | null;
	strIngredient10: string | null;
	strIngredient11: string | null;
	strIngredient12: string | null;
	strIngredient13: string | null;
	strIngredient14: string | null;
	strIngredient15: string | null;
	strIngredient16: string | null;
	strIngredient17: string | null;
	strIngredient18: string | null;
	strIngredient19: string | null;
	strIngredient20: string | null;

	// Measures 1–20
	strMeasure1: string | null;
	strMeasure2: string | null;
	strMeasure3: string | null;
	strMeasure4: string | null;
	strMeasure5: string | null;
	strMeasure6: string | null;
	strMeasure7: string | null;
	strMeasure8: string | null;
	strMeasure9: string | null;
	strMeasure10: string | null;
	strMeasure11: string | null;
	strMeasure12: string | null;
	strMeasure13: string | null;
	strMeasure14: string | null;
	strMeasure15: string | null;
	strMeasure16: string | null;
	strMeasure17: string | null;
	strMeasure18: string | null;
	strMeasure19: string | null;
	strMeasure20: string | null;

	strSource: string | null;
	strImageSource: string | null;
	strCreativeCommonsConfirmed: string | null;
	dateModified: string | null;
};

async function loadRecipes() {
	const response = await fetch(
		"https://www.themealdb.com/api/json/v1/1/search.php?s=",
	);
	const result = await response.json();
	return result.meals as Meal[];
}
export function SearchBar() {
	useEffect(() => {
		loadRecipes().then((mealsFromApi) => setMeals(mealsFromApi));
	}, []);

	const [meals, setMeals] = useState<Meal[]>([]);
	const [searchType, setSearchType] = useState<"recipe" | "ingredient">(
		"recipe",
	);
	const [search, setSearch] = useState<string>("");

	const filteredMeals =
		search.trim() === ""
			? []
			: meals.filter((m) =>
					m.strMeal?.toLowerCase()?.includes(search?.toLowerCase()),
				);
	return (
		<div>
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
						value={search}
						className="search-input"
						onChange={(event) => {
							setSearch(event.target.value);
						}}
					/>
					<button type="button" className="search-btn">
						<img src="src/assets/images/search.png" alt="Search icon" />
					</button>
				</div>
			</div>
			<ul>
				{filteredMeals.map((m) => (
					<li key={m.idMeal}>{m.strMeal}</li>
				))}
			</ul>
		</div>
	);
}
