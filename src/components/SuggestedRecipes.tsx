import type { Ingredient, Recipe, SearchType } from "../types/search.ts";
import "../styles/SearchBar.css";
import type { RecipeType } from "../types/recipe.ts";
import RecipeCard from "./RecipeCard.tsx";

export function SuggestedRecipes({
	selectedIngredients,
	recipes,
	searchType,
}: {
	selectedIngredients: Ingredient[];
	recipes: Recipe[];
	searchType: SearchType;
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

	/* Je vais remplacer cette partie par le composant RecipeCard de Julien
	 alors faites pas attention à l'inline css svp. Merci. */
	return filteredRecipes.map((recipe) => (
		<RecipeCard key={recipe.idMeal} recipe={recipe as RecipeType} />
	));
}
