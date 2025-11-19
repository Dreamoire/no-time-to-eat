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
			{selectedIngredients.map((i) => (
				<div className="selected-ingredient-card" key={i.idIngredient}>
					{i.strThumb ? (
						<img
							className="selected-ingredient-img"
							src={i.strThumb}
							alt={i.strIngredient}
						/>
					) : null}
					<span>{i.strIngredient}</span>
					<button
						className="selected-ingredient-btn"
						type="button"
						onClick={() => {
							onRemoveIngredient(i);
						}}
					>
						X
					</button>
				</div>
			))}
		</div>
	);
}
