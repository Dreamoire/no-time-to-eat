import { useState } from "react";
import type { ChangeEvent } from "react";
import "../styles/ingredient_filter.css";

function IngredientFilter() {
	// Tableau de test pour le filtre, non définitif //
	const testRecipes = [
		{
			titre: "Spaghetti Bolognaise",
			strCategory: "Pasta",
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
			strCategory: "Starter",
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
			strCategory: "Miscellaneous",
			tempsPreparation: 15,
			ingredients: ["Œufs", "Champignons", "Beurre", "Sel", "Poivre"],
			preparation:
				"Faites revenir les champignons dans du beurre, battez les œufs, versez-les dans la poêle et laissez cuire doucement.",
		},
		{
			titre: "Poulet rôti",
			strCategory: "Chicken",
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
			strCategory: "Vegan",
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
			strCategory: "Pork",
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
			strCategory: "Dessert",
			tempsPreparation: 60,
			ingredients: ["Pâte feuilletée", "Pommes", "Sucre", "Cannelle", "Beurre"],
			preparation:
				"Disposez les pommes tranchées sur la pâte, saupoudrez de sucre et cannelle, ajoutez quelques noisettes de beurre et enfournez.",
		},
		{
			titre: "Ratatouille",
			strCategory: "Vegan",
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
			strCategory: "Dessert",
			tempsPreparation: 25,
			ingredients: ["Farine", "Œufs", "Lait", "Beurre", "Sucre"],
			preparation:
				"Mélangez farine, œufs et lait, laissez reposer la pâte, puis faites cuire les crêpes dans une poêle beurrée.",
		},
		{
			titre: "Pizza Margherita",
			strCategory: "Vegetarian",
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

	const [calorie, setCalorie] = useState<number>(500);
	const selectedCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setCalorie(Number(e.target.value));
	};

	const [compatibility, setCompatibility] = useState<number>(50);
	const selectedCompatibility = (e: ChangeEvent<HTMLInputElement>) => {
		setCompatibility(Number(e.target.value));
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
					<img src="src\assets\images\filter.svg" alt="" />
				</button>
				{(open || closing) && (
					<div className={`input-filter ${closing ? "closing" : "open"}`}>
						<label htmlFor="time">Temps de préparation : {time} min</label>
						<input
							type="range"
							min="0"
							max="240"
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
								{testRecipes.map(
									(recipe, index) =>
										testRecipes.findIndex(
											(r) => r.strCategory === recipe.strCategory,
										) === index && (
											<option key={recipe.titre} value={recipe.strCategory}>
												{recipe.strCategory}
											</option>
										),
								)}
							</select>
							<label htmlFor="meal">Meal's type</label>
						</div>
						<div className="input-form">
							<input
								type="number"
								min="0"
								max="100"
								step="10"
								className="input"
								value={compatibility}
								onChange={selectedCompatibility}
							/>
							<label htmlFor="number">Compatibilité en %</label>
						</div>
						<label htmlFor="time">calories max : {calorie} kcal</label>
						<input
							type="range"
							min="0"
							max="1000"
							step="1"
							value={calorie}
							onChange={selectedCalorie}
							className="stick-filter"
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default IngredientFilter;
