import type { Ingredient, Recipe, SearchType } from "../types/search.ts";
import "../styles/SearchBar.css";
import type { RecipeType } from "../types/recipe.ts";
import RecipeCard from "./RecipeCard.tsx";

export function SuggestedRecipes({
	selectedIngredients,
	recipes,
	searchType,
	mealIngBar,
}: {
	selectedIngredients: Ingredient[];
	recipes: Recipe[];
	searchType: SearchType;
	mealIngBar: string;
}) {
	if (searchType !== "ingredient") {
		return null;
	}
	if (selectedIngredients.length === 0) {
		return null;
	}

	const selectedIngredientsAsString = selectedIngredients.map(
		(selectedIngredient) => selectedIngredient.strIngredient,
	);

	const filteredRecipes = recipes.filter((recipe) => {
		const recipeIngredientsLower = recipe.ingredients.map((ingredient) =>
			ingredient.toLowerCase(),
		);

		const hasAllSelectedIngredients = selectedIngredientsAsString.every(
			(selectedIngredient) =>
				recipeIngredientsLower.some((recipeIngredient) =>
					recipeIngredient.includes(selectedIngredient.toLowerCase()),
				),
		);

		return hasAllSelectedIngredients;
	});

	return filteredRecipes
		.filter((recipe) =>
			mealIngBar === "" ? true : recipe.strCategory === mealIngBar,
		)
		.map((recipe) => (
			<RecipeCard key={recipe.idMeal} recipe={recipe as RecipeType} />
		));
}
