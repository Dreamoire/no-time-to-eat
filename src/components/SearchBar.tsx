import { useEffect, useState } from "react";
import "../styles/SearchBar.css";
import { recipe_urls } from "../urls/recipe-urls.ts";
import { FilteredIngredients } from "./FilteredIngredients";
import { SelectedIngredients } from "./SelectedIngredients";
import { SuggestedRecipes } from "./SuggestedRecipes";

import type { Ingredient, Recipe, SearchType } from "../types/search.ts";

async function loadRecipes(): Promise<Recipe[]> {
	const responses = await Promise.all(recipe_urls.map((url) => fetch(url)));
	const results = await Promise.all(responses.map((res) => res.json()));
	let recipes: Recipe[] = results.flatMap((recipe) => recipe.meals || []);

	recipes = recipes.map((recipe) => {
		const ingredients: string[] = [];

		for (let i = 1; i <= 20; i++) {
			const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
			if (
				ingredient &&
				typeof ingredient === "string" &&
				ingredient.trim() !== ""
			) {
				ingredients.push(ingredient);
			}
		}

		return { ...recipe, ingredients };
	});

	return recipes;
}

async function loadIngredients() {
	const response = await fetch(
		"https://www.themealdb.com/api/json/v1/1/list.php?i=list",
	);
	const result = await response.json();
	return result.meals as Ingredient[];
}

export function SearchBar() {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
		[],
	);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	useEffect(() => {
		loadRecipes().then((recipesFromApi) => setRecipes(recipesFromApi));
		loadIngredients().then((ingredientsFromAPI) =>
			setIngredients(ingredientsFromAPI),
		);
	}, []);

	const [searchType, setSearchType] = useState<SearchType>("ingredient");
	const [search, setSearch] = useState<string>("");

	const filteredRecipes =
		search.trim() === ""
			? []
			: recipes.filter((recipe) =>
					recipe.strMeal?.toLowerCase()?.includes(search?.toLowerCase()),
				);

	const filteredIngredients =
		search.trim() === ""
			? []
			: ingredients.filter((ingredient) =>
					ingredient.strIngredient.toLowerCase().includes(search.toLowerCase()),
				);

	return (
		<div>
			<div className="search">
				<div
					className={
						searchType === "recipe"
							? "search-switch search-switch-recipe"
							: "search-switch search-switch-ingredient"
					}
				>
					<span>{searchType === "recipe" ? "Recipe" : "Ingredient"}</span>
					<input
						type="checkbox"
						checked={searchType === "ingredient"}
						id="switch"
						name="switch"
						onChange={() =>
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
			<div className="search-results">
				{searchType === "recipe"
					? filteredRecipes.map((recipe) => (
							<li key={recipe.idMeal}>{recipe.strMeal}</li>
						))
					: null}

				<FilteredIngredients
					searchType={searchType}
					filteredIngredients={filteredIngredients}
					selectedIngredients={selectedIngredients}
					onSelectIngredient={(ingredient) => {
						const hasAlreadyBeenAdded = selectedIngredients.some(
							(selectedIngredient) =>
								ingredient.idIngredient === selectedIngredient.idIngredient,
						);

						if (!hasAlreadyBeenAdded) {
							setSelectedIngredients([...selectedIngredients, ingredient]);
						}

						setSearch("");
					}}
				/>

				<SelectedIngredients
					onRemoveIngredient={(ingredientToRemove) => {
						const newIngredients = selectedIngredients.filter(
							(selectedIngredient) =>
								selectedIngredient.idIngredient !==
								ingredientToRemove.idIngredient,
						);
						setSelectedIngredients(newIngredients);
					}}
					selectedIngredients={selectedIngredients}
					searchType={searchType}
				/>

				<SuggestedRecipes
					selectedIngredients={selectedIngredients}
					recipes={recipes}
					searchType={searchType}
				/>
			</div>
		</div>
	);
}
