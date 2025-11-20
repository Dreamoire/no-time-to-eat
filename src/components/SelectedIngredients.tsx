import type { Ingredient, SearchType } from "../types/search.ts";
import "../styles/SearchBar.css";

export function SelectedIngredients({
	selectedIngredients,
	onRemoveIngredient,
	searchType,
}: {
	selectedIngredients: Ingredient[];
	searchType: SearchType;
	onRemoveIngredient: (ingredient: Ingredient) => void;
}) {
	if (searchType !== "ingredient") {
		return null;
	}

	return (
		<div className="selected-ingredients">
			{selectedIngredients.map((ingredient) => (
				<div className="selected-ingredient-card" key={ingredient.idIngredient}>
					{ingredient.strThumb ? (
						<img
							className="selected-ingredient-img"
							src={ingredient.strThumb}
							alt={ingredient.strIngredient}
						/>
					) : null}
					<span>{ingredient.strIngredient}</span>
					<button
						className="selected-ingredient-btn"
						type="button"
						onClick={() => {
							onRemoveIngredient(ingredient);
						}}
					>
						X
					</button>
				</div>
			))}
		</div>
	);
}
