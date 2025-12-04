import type { Ingredient, Recipe, SearchType } from "../types/search.ts";
import "../styles/SearchBar.css";
import { useFavorite } from "../contexts/FavoriteContext.tsx";
import type { RecipeType } from "../types/recipe.ts";
import RecipeCard from "./RecipeCard.tsx";

export function SuggestedRecipes({
	selectedIngredients,
	recipes,
	searchType,
	mealIngBar,
	timeIngBar,
}: {
	selectedIngredients: Ingredient[];
	recipes: Recipe[];
	searchType: SearchType;
	mealIngBar: string;
	timeIngBar: number;
}) {
	const { favoriteRecipes } = useFavorite();

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

	const categoryFilteredRecipes = filteredRecipes
		.filter((recipe) =>
			mealIngBar === "" ? true : recipe.strCategory === mealIngBar,
		)
		.filter((recipe) => timeIngBar >= recipe.prTime);

	if (categoryFilteredRecipes.length === 0) {
		return <p className="empty-recipe">No recipe found</p>;
	}

	const favoriteIds = new Set(favoriteRecipes.map((fav) => fav.idMeal));
	const sortedRecipes = [...categoryFilteredRecipes].sort((a, b) => {
		const aIsFavorite = favoriteIds.has(a.idMeal);
		const bIsFavorite = favoriteIds.has(b.idMeal);
		return Number(bIsFavorite) - Number(aIsFavorite);
	});

	return (
		<>
			{sortedRecipes.length !== 0 && (
				<p className="empty-recipe">{sortedRecipes.length} recipes found</p>
			)}
			<div className="recipe-results-container">
				{sortedRecipes.map((recipe) => (
					<RecipeCard key={recipe.idMeal} recipe={recipe as RecipeType} />
				))}
			</div>
		</>
	);
}
