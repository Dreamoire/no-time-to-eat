import type { Ingredient, SearchType } from "./SearchBar";

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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 8,
				marginTop: 12,
			}}
		>
			{filteredIngredients.map((i) => (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					key={i.idIngredient}
					onClick={() => onSelectIngredient(i)}
					style={{
						backgroundColor: selectedIngredients.some(
							(si) => si.idIngredient === i.idIngredient,
						)
							? "#b9b9b9ff"
							: "#dbdbdbff",
						borderRadius: 12,
						display: "flex",
						gap: 6,
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					{i.strThumb ? (
						<img
							src={i.strThumb}
							alt={i.strIngredient}
							style={{
								width: "100%",
								height: "auto",
								maxWidth: 48,
							}}
						/>
					) : null}
					<span>{i.strIngredient}</span>
				</div>
			))}
		</div>
	);
}
