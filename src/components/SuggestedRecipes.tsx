import type { Ingredient, Recipe, SearchType } from "../types/search.ts";
import "../styles/SearchBar.css";

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
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				gap: 12,
				marginTop: 24,
				flexWrap: "wrap",
				width: "100%",
			}}
		>
			{filteredRecipes.map((recipe) => (
				<div
					key={recipe.idMeal}
					style={{
						padding: 12,
						backgroundColor: "#dbdbdbff",
						width: "100%",
						maxWidth: 120,
						borderRadius: 12,
						display: "flex",
						gap: 6,
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{recipe.strMealThumb ? (
						<img
							src={recipe.strMealThumb}
							alt={recipe.strMeal}
							style={{
								width: "100%",
								height: "auto",
								maxWidth: 72,
							}}
						/>
					) : null}
					<span>{recipe.strMeal}</span>
				</div>
			))}
		</div>
	);
}
