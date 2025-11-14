import type { Ingredient, SearchType } from "./SearchBar";

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
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "start",
				marginTop: 20,
				width: "100%",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					gap: 8,
					flexWrap: "wrap",
					width: "100%",
				}}
			>
				{selectedIngredients.map((i) => (
					<div
						key={i.idIngredient}
						style={{
							backgroundColor: "#e9e9e9ff",
							borderRadius: 12,
							display: "flex",
							gap: 6,
							flexDirection: "column",
							alignItems: "center",
							width: "100%",
							maxWidth: 120,
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
						<span style={{ fontSize: 14, fontWeight: "bold" }}>
							{i.strIngredient}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
