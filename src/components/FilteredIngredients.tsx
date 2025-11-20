import type { Ingredient, SearchType } from "../types/search.ts";
import "../styles/SearchBar.css";

export function FilteredIngredients({
	filteredIngredients,
	onSelectIngredient,
	searchType,
	selectedIngredients,
}: {
	filteredIngredients: Ingredient[];
	selectedIngredients: Ingredient[];
	searchType: SearchType;
	onSelectIngredient: (ingredient: Ingredient) => void;
}) {
	if (searchType !== "ingredient") {
		return null;
	}

	return (
		<div className="filtered-ingredient-list">
			{filteredIngredients.map((filteredIngredient) => {
				const isSelected = selectedIngredients.some(
					(selectedIngredient) =>
						selectedIngredient.idIngredient === filteredIngredient.idIngredient,
				);

				return (
					<button
						type="button"
						key={filteredIngredient.idIngredient}
						className={
							isSelected
								? "filtered-ingredient filtered-ingredient-selected"
								: "filtered-ingredient filtered-ingredient-default"
						}
						onClick={() => onSelectIngredient(filteredIngredient)}
					>
						{filteredIngredient.strThumb ? (
							<img
								className="filtered-ingredient-img"
								src={filteredIngredient.strThumb}
								alt={filteredIngredient.strIngredient}
							/>
						) : null}
						<span>{filteredIngredient.strIngredient}</span>
					</button>
				);
			})}
		</div>
	);
}
