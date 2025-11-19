import { useEffect, useMemo, useState } from "react";
import "../styles/SearchBar.css";
import { meal_urls } from "../urls/meal-urls.ts";
import { FilteredIngredients } from "./FilteredIngredients";
import { SelectedIngredients } from "./SelectedIngredients";
import { SuggestedRecipies } from "./SuggestedRecipes";

import type { Ingredient, Meal, SearchType } from "../types/search.ts";

async function loadRecipes() {
	const responses = await Promise.all(meal_urls.map((url) => fetch(url)));
	const results = await Promise.all(responses.map((res) => res.json()));
	const allMealsRaw: Meal[] = results.flatMap((r) => r.meals || []);

	/*Extraire les ingrédients de chaque recette et renvoyer une version qui contient la recette et un tableau d'ingrédients */
	const meals = allMealsRaw.map((meal) => {
		const strIngredients: string[] = [];

		for (let i = 1; i <= 20; i++) {
			const ingredient = meal[`strIngredient${i}` as keyof Meal];
			if (
				ingredient &&
				typeof ingredient === "string" &&
				ingredient.trim() !== ""
			) {
				strIngredients.push(ingredient);
			}
		}

		return { ...meal, strIngredients };
	});

	return meals;
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
	const [meals, setMeals] = useState<Meal[]>([]);
	useEffect(() => {
		loadRecipes().then((mealsFromApi) => setMeals(mealsFromApi));
		loadIngredients().then((ingredientsFromAPI) =>
			setIngredients(ingredientsFromAPI),
		);
	}, []);

	const [searchType, setSearchType] = useState<SearchType>("ingredient");
	const [search, setSearch] = useState<string>("");

	const filteredMeals =
		search.trim() === ""
			? []
			: meals.filter((m) =>
					m.strMeal?.toLowerCase()?.includes(search?.toLowerCase()),
				);

	const filteredIngredients = useMemo(() => {
		if (search.trim() === "") {
			return [];
		}

		const filter = ingredients.filter((i) => {
			return i.strIngredient.toLowerCase().includes(search.toLowerCase());
		});

		return filter;
	}, [search, ingredients]);

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
					? filteredMeals.map((m) => <li key={m.idMeal}>{m.strMeal}</li>)
					: null}

				<FilteredIngredients
					searchType={searchType}
					filteredIngredients={filteredIngredients}
					selectedIngredients={selectedIngredients}
					onSelectIngredient={(i) => {
						// On vérifie que l'ingrédient n'ait pas déjà été ajouté
						const hasAlreadyBeenAdded = selectedIngredients.some(
							(selectedIngredient) =>
								i.idIngredient === selectedIngredient.idIngredient,
						);

						// Si l'ingrédient a déjà été select, on ne l'ajoute pas (sinon il sera en double)
						if (!hasAlreadyBeenAdded) {
							setSelectedIngredients([...selectedIngredients, i]);
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

				<SuggestedRecipies
					selectedIngredients={selectedIngredients}
					meals={meals}
					searchType={searchType}
				/>
			</div>
		</div>
	);
}
