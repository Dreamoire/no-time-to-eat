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
			{filteredIngredients.map((i) => {
				const isSelected = selectedIngredients.some(
					(si) => si.idIngredient === i.idIngredient,
				);

				return (
					<button
						type="button"
						key={i.idIngredient}
						className={
							isSelected
								? "filtered-ingredient filtered-ingredient-selected"
								: "filtered-ingredient filtered-ingredient-default"
						}
						onClick={() => onSelectIngredient(i)}
					>
						{i.strThumb ? (
							<img
								className="filtered-ingredient-img"
								src={i.strThumb}
								alt={i.strIngredient}
							/>
						) : null}
						<span>{i.strIngredient}</span>
					</button>
				);
			})}
		</div>
	);
}
