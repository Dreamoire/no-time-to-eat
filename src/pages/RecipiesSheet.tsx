import { useEffect, useState } from "react";
import favoriteIcon from "../assets/images/favoris.png";
import printerIcon from "../assets/images/printer.png";
import "../styles/RecipiesSheet.css";

// Type minimal pour le repas récupéré depuis l'API
type Meal = {
	strMeal: string;
	strMealThumb: string;
	strInstructions: string;
} & Record<string, string | null>;

export default function RecipiesSheet() {
	const [meal, setMeal] = useState<Meal | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const recipeId = 52963;

	useEffect(() => {
		async function fetchRecipe() {
			try {
				const response = await fetch(
					`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
				);

				if (!response.ok) {
					throw new Error("Erreur API");
				}

				const data = (await response.json()) as { meals: Meal[] };
				setMeal(data.meals[0]);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Erreur inconnue");
				}
			} finally {
				setLoading(false);
			}
		}

		fetchRecipe();
	}, []);

	if (loading) {
		return <p className="loading">Chargement...</p>;
	}

	if (error || !meal) {
		return <p className="error">Impossible de charger la recette.</p>;
	}

	const ingredients: string[] = [];
	for (let i = 1; i <= 20; i += 1) {
		const ing = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];

		if (ing && ing.trim() !== "") {
			ingredients.push(`${ing} - ${measure ?? ""}`.trim());
		}
	}

	return (
		<main className="recipe-sheet">
			<header className="recipe-header">
				<section className="recipe-hero">
					<section className="recipe-hero-text">
						<p>recette</p>
						<h1>{meal.strMeal}</h1>

						<section className="recipe-buttons">
							<button type="button" className="icon-button" title="Favoris">
								<img src={favoriteIcon} alt="Ajouter aux favoris" />
							</button>

							{/* ClassNames temporaires pour les boutons — ici viendra ensuite le bouton Print / Imprimer */}

							<button type="button" className="icon-button" title="Imprimer">
								<img src={printerIcon} alt="Imprimer la recette" />
							</button>
							<span>4856 kcal / 100g</span>
						</section>

						<ul className="recipe-tags">
							<li>cuisson : 30 min</li>
							<li>pour 6 personnes</li>
						</ul>
					</section>

					<figure className="recipe-hero-figure">
						<img src={meal.strMealThumb} alt={meal.strMeal} />
					</figure>
				</section>
			</header>

			<section>
				<aside className="ingredients-panel">
					<h2>Ingrédients</h2>

					<ul>
						{ingredients.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</aside>

				<article className="preparation-panel">
					<h2>Préparation</h2>

					{meal.strInstructions
						?.split(/\r?\n/)
						.filter((p) => p.trim() !== "")
						.map((p) => (
							<p key={p}>{p}</p>
						))}
				</article>
			</section>

			<footer className="recipe-footer">
				<p>© Magic Fridge - 2025</p>
			</footer>
		</main>
	);
}
