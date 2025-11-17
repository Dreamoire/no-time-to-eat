import { useState } from "react";
import type { ChangeEvent } from "react";
import "../styles/recipe_filter.css";

function RecipeFilter() {
	// Tableau de test pour le filtre, non définitif //
	const testRecipes = [
		{
			titre: "Spaghetti Bolognaise",
			tempsPreparation: 30,
			ingredients: [
				"Spaghetti",
				"Viande hachée",
				"Tomates",
				"Oignon",
				"Ail",
				"Huile d'olive",
				"Herbes",
			],
			preparation:
				"Faites revenir l’oignon et l’ail, ajoutez la viande hachée, puis les tomates et les herbes. Laissez mijoter et servez avec les spaghetti cuits.",
		},
		{
			titre: "Salade César",
			tempsPreparation: 20,
			ingredients: [
				"Laitue romaine",
				"Poulet grillé",
				"Croûtons",
				"Parmesan",
				"Sauce César",
			],
			preparation:
				"Coupez la laitue, ajoutez le poulet en morceaux, les croûtons et le parmesan. Mélangez avec la sauce César.",
		},
		{
			titre: "Omelette aux champignons",
			tempsPreparation: 15,
			ingredients: ["Œufs", "Champignons", "Beurre", "Sel", "Poivre"],
			preparation:
				"Faites revenir les champignons dans du beurre, battez les œufs, versez-les dans la poêle et laissez cuire doucement.",
		},
		{
			titre: "Poulet rôti",
			tempsPreparation: 90,
			ingredients: [
				"Poulet entier",
				"Beurre",
				"Herbes de Provence",
				"Sel",
				"Poivre",
			],
			preparation:
				"Badigeonnez le poulet de beurre et d’herbes, enfournez à 180°C et arrosez régulièrement jusqu’à cuisson complète.",
		},
		{
			titre: "Soupe de légumes",
			tempsPreparation: 40,
			ingredients: [
				"Carottes",
				"Pommes de terre",
				"Poireaux",
				"Courgettes",
				"Bouillon",
			],
			preparation:
				"Coupez les légumes, plongez-les dans le bouillon et laissez mijoter. Mixez pour une texture veloutée.",
		},
		{
			titre: "Quiche Lorraine",
			tempsPreparation: 50,
			ingredients: [
				"Pâte brisée",
				"Lardons",
				"Crème fraîche",
				"Œufs",
				"Gruyère",
			],
			preparation:
				"Disposez la pâte dans un moule, ajoutez les lardons, mélangez crème et œufs, versez et parsemez de gruyère avant cuisson.",
		},
		{
			titre: "Tarte aux pommes",
			tempsPreparation: 60,
			ingredients: ["Pâte feuilletée", "Pommes", "Sucre", "Cannelle", "Beurre"],
			preparation:
				"Disposez les pommes tranchées sur la pâte, saupoudrez de sucre et cannelle, ajoutez quelques noisettes de beurre et enfournez.",
		},
		{
			titre: "Ratatouille",
			tempsPreparation: 60,
			ingredients: [
				"Aubergines",
				"Courgettes",
				"Poivrons",
				"Tomates",
				"Oignon",
				"Ail",
			],
			preparation:
				"Faites revenir l’oignon et l’ail, ajoutez les légumes coupés en dés, laissez mijoter doucement jusqu’à tendreté.",
		},
		{
			titre: "Crêpes",
			tempsPreparation: 25,
			ingredients: ["Farine", "Œufs", "Lait", "Beurre", "Sucre"],
			preparation:
				"Mélangez farine, œufs et lait, laissez reposer la pâte, puis faites cuire les crêpes dans une poêle beurrée.",
		},
		{
			titre: "Pizza Margherita",
			tempsPreparation: 45,
			ingredients: [
				"Pâte à pizza",
				"Sauce tomate",
				"Mozzarella",
				"Basilic",
				"Huile d'olive",
			],
			preparation:
				"Étalez la pâte, garnissez de sauce tomate et mozzarella, enfournez à 220°C puis ajoutez le basilic frais à la sortie.",
		},
	];

	const [time, setTime] = useState<number>(50);
	const selectedTime = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(Number(e.target.value));
	};

	const [meal, setMeal] = useState<string>("");
	const selectedMeal = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setMeal(e.target.value);
	};

	const [open, setOpen] = useState(false);
	const [closing, setClosing] = useState(false);
	const toggleMenu = () => {
		if (open) {
			setClosing(true);
			setTimeout(() => {
				setOpen(false);
				setClosing(false);
			}, 300);
		} else {
			setOpen(true);
		}
	};

	return (
		<>
			<div className="recipe-filter">
				<button type="button" onClick={toggleMenu} className="button-filter">
					<img src="src\assets\images\filter.svg" alt="Icon filter" />
				</button>
				{(open || closing) && (
					<div className={`input-filter ${closing ? "closing" : "open"}`}>
						<label htmlFor="time">Temps de préparation : {time} min</label>
						<input
							type="range"
							min="0"
							max="120"
							step="1"
							value={time}
							onChange={selectedTime}
							className="stick-filter"
						/>
						<div className="input-form">
							<select
								id="meal"
								value={meal}
								onChange={selectedMeal}
								className="input"
							>
								<option value="">-- Chose --</option>
								<option value="Beef">Beef</option>
								<option value="Breakfast">Breakfast</option>
								<option value="Chicken">Chicken</option>
								<option value="Dessert">Dessert</option>
								<option value="Goat">Goat</option>
								<option value="Lamb">Lamb</option>
								<option value="Miscellaneous">Miscellaneous</option>
								<option value="Pasta">Pasta</option>
								<option value="Pork">Pork</option>
								<option value="Seafood">Seafood</option>
								<option value="Side">Side</option>
								<option value="Starter">Starter</option>
								<option value="Vegan">Vegan</option>
								<option value="Vegetarian">Vegetarian</option>
							</select>
							<label htmlFor="meal">Meal's type</label>
						</div>
					</div>
				)}
			</div>
			{/* La map suivante est seulement pour verifié la fontionalité du filtre, non défénitive */}
			{testRecipes.map((recipe) =>
				recipe.tempsPreparation <= time ? (
					<div key={recipe.titre}>{recipe.titre}</div>
				) : (
					""
				),
			)}
		</>
	);
}

export default RecipeFilter;
