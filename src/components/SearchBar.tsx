import { useEffect, useState } from "react";
import "../styles/SearchBar.css";
import "../styles/Filter.css";
import type { ChangeEvent } from "react";
import type { RecipeType } from "../types/recipe.ts";
import type { Ingredient, Recipe, SearchType } from "../types/search.ts";
import { recipe_urls } from "../urls/recipe-urls.ts";
import { FilteredIngredients } from "./FilteredIngredients";
import RecipeCard from "./RecipeCard.tsx";
import { SelectedIngredients } from "./SelectedIngredients";
import { SuggestedRecipes } from "./SuggestedRecipes";

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
	const [timeRecipeBar, setTimeRecipeBar] = useState<number>(50);
	const selectedTimeRecipeBar = (e: ChangeEvent<HTMLInputElement>) => {
		setTimeRecipeBar(Number(e.target.value));
	};

	const [timeIngBar, setTimeIngBar] = useState<number>(50);
	const selectedTimeIngBar = (e: ChangeEvent<HTMLInputElement>) => {
		setTimeIngBar(Number(e.target.value));
	};

	const [mealRecipeBar, setMealRecipeBar] = useState<string>("");
	const selectedMealRecipeBar = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMealRecipeBar(e.target.value);
	};

	const [mealIngBar, setMealIngBar] = useState<string>("");
	const selectedMealIngBar = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMealIngBar(e.target.value);
	};

	const [calorie, setCalorie] = useState<number>(500);
	const selectedCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setCalorie(Number(e.target.value));
	};

	const [compatibility, setCompatibility] = useState<number>(50);
	const selectedCompatibility = (e: ChangeEvent<HTMLInputElement>) => {
		setCompatibility(Number(e.target.value));
	};

	const [open, setOpen] = useState(false);
	const [closing, setClosing] = useState(false);
	const toggleMenu = () => {
		if (open) {
			setClosing(true);
			setTimeout(() => {
				setOpen(false);
				setClosing(false);
			}, 300);
		} else {
			setOpen(true);
		}
	};
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
								: "Search by ingredients"
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
				{searchType === "recipe" ? (
					<div className="recipe-filter">
						<button
							type="button"
							onClick={toggleMenu}
							className="button-filter"
						>
							<img src="src\assets\images\filter.svg" alt="Icon filter" />
						</button>
						{(open || closing) && (
							<div
								className={`input-filter-recipe ${closing ? "closing" : "open"}`}
							>
								<label htmlFor="time">
									Temps de préparation : {timeRecipeBar} min
								</label>
								<input
									id="time"
									type="range"
									min="0"
									max="120"
									step="1"
									value={timeRecipeBar}
									onChange={selectedTimeRecipeBar}
									className="stick-filter"
								/>
								<div className="input-form">
									<select
										id="meal"
										value={mealRecipeBar}
										onChange={selectedMealRecipeBar}
										className="input"
									>
										<option value={""}>All</option>
										{recipes.map(
											(recipe, index) =>
												recipes.findIndex(
													(r) => r.strCategory === recipe.strCategory,
												) === index && (
													<option
														key={recipe.idMeal}
														value={recipe.strCategory ?? ""}
													>
														{recipe.strCategory}
													</option>
												),
										)}
									</select>
									<label htmlFor="meal">Meal's type</label>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="recipe-filter">
						<button
							type="button"
							onClick={toggleMenu}
							className="button-filter"
						>
							<img src="src\assets\images\filter.svg" alt="" />
						</button>
						{(open || closing) && (
							<div
								className={`input-filter-ingredient ${closing ? "closing" : "open"}`}
							>
								<label htmlFor="time">
									Temps de préparation : {timeIngBar} min
								</label>
								<input
									type="range"
									min="0"
									max="120"
									step="1"
									value={timeIngBar}
									onChange={selectedTimeIngBar}
									className="stick-filter"
								/>
								<div className="input-form">
									<select
										id="meal"
										value={mealIngBar}
										onChange={selectedMealIngBar}
										className="input"
									>
										<option value={""}>All</option>
										{recipes.map(
											(recipe, index) =>
												recipes.findIndex(
													(r) => r.strCategory === recipe.strCategory,
												) === index && (
													<option
														key={recipe.idMeal}
														value={recipe.strCategory ?? ""}
													>
														{recipe.strCategory}
													</option>
												),
										)}
									</select>
									<label htmlFor="meal">Meal's type</label>
								</div>
								<div className="input-form">
									<input
										type="number"
										min="0"
										max="100"
										step="10"
										className="input"
										value={compatibility}
										onChange={selectedCompatibility}
									/>
									<label htmlFor="number">Compatibilité en %</label>
								</div>
								<label htmlFor="time">calories max : {calorie} kcal</label>
								<input
									type="range"
									min="0"
									max="1000"
									step="1"
									value={calorie}
									onChange={selectedCalorie}
									className="stick-filter"
								/>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="search-results">
				{searchType === "recipe" &&
					filteredRecipes
						.filter((recipe) =>
							mealRecipeBar === ""
								? true
								: recipe.strCategory === mealRecipeBar,
						)
						.map((recipe) => (
							<RecipeCard key={recipe.idMeal} recipe={recipe as RecipeType} />
						))}

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
					mealIngBar={mealIngBar}
				/>
			</div>
		</div>
	);
}
