import type { Ingredient, Meal, SearchType } from "../types/search.ts";
import "../styles/SearchBar.css";

export function SuggestedRecipies({
	selectedIngredients,
	meals,
	searchType,
}: {
	selectedIngredients: Ingredient[];
	meals: Meal[];
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

	const filteredMeals = meals.filter((meal) => {
		const mealIngredientsLower = meal.strIngredients.map((ing) =>
			ing.toLowerCase(),
		);

		// Pour afficher uniquement les recettes qui contiennent tous les ingrédients sélectionnés
		const hasAllSelectedIngredients = selectedIngredientsAsString.every(
			(selectedIngredient) =>
				mealIngredientsLower.some((mealIngredient) =>
					mealIngredient.includes(selectedIngredient.toLowerCase()),
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
			{filteredMeals.map((meal) => (
				<div
					key={meal.idMeal}
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
					{meal.strMealThumb ? (
						<img
							src={meal.strMealThumb}
							alt={meal.strMeal}
							style={{
								width: "100%",
								height: "auto",
								maxWidth: 72,
							}}
						/>
					) : null}
					<span>{meal.strMeal}</span>
				</div>
			))}
		</div>
	);
}
