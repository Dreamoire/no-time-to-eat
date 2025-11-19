import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import cookingTimeIcon from "../assets/images/cooking-time.png";
import eatingPersonIcon from "../assets/images/eating-person.png";
import favoriteIcon from "../assets/images/favoris_empty.png";
import printerIcon from "../assets/images/printer.png";
import CalorieInfo from "../components/CalorieInfo";
import type { Recipe } from "../types/meal";

import "../styles/RecipeSheet.css";

export default function RecipeSheet() {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { id } = useParams<{ id: string }>();

	const printRef = useRef<HTMLDivElement | null>(null);

	const handlePrint = useReactToPrint({
		contentRef: printRef,
		documentTitle: "Recipe",
	});

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await fetch(
					`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
				);

				if (!response.ok) {
					throw new Error("Erreur API");
				}

				const recipeData = (await response.json()) as { meals: Recipe[] };
				setRecipe(recipeData.meals[0]);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("Erreur inconnue");
				}
			} finally {
				setLoading(false);
			}
		};

		void fetchRecipe();
	}, [id]);

	if (loading) {
		return <p className="loading">Loading...</p>;
	}

	if (error || !recipe) {
		return <p className="error">Unable to load the recipe.</p>;
	}

	const ingredients: string[] = [];
	for (let i = 1; i <= 20; i += 1) {
		const ing = recipe[`strIngredient${i}`];
		const measure = recipe[`strMeasure${i}`];

		if (ing && ing.trim() !== "") {
			ingredients.push(`${ing} - ${measure ?? ""}`.trim());
		}
	}

	return (
		<main className="recipe-sheet">
			<div ref={printRef}>
				<header className="recipe-header">
					<section className="recipe-hero">
						<section className="recipe-hero-text">
							<p>recette</p>
							<h1>{recipe.strMeal}</h1>

							<section className="recipe-buttons">
								<div className="recipe-buttons-row recipe-buttons-row--top">
									<button
										type="button"
										className="icon-button icon-button--primary icon-button--favorite"
										title="Favorites"
									>
										<img src={favoriteIcon} alt="Add to favorites" />
									</button>
									<button
										type="button"
										onClick={handlePrint}
										className="icon-button icon-button--primary icon-button--print"
										title="Print"
									>
										<img src={printerIcon} alt="Print the recipe" />
									</button>
								</div>

								<CalorieInfo meal={recipe} className="recipe-kcal-styled" />

								<ul className="recipe-tags recipe-buttons-row recipe-buttons-row--bottom">
									<li title="cooking time: 30 min">
										<button
											type="button"
											className="icon-button icon-button--info"
											aria-label="cooking time: 30 min"
										>
											<img src={cookingTimeIcon} alt="" />
										</button>
										<span className="recipe-tag-text">30 min</span>
									</li>

									<li title="serves 6 people">
										<button
											type="button"
											className="icon-button icon-button--info"
											aria-label="serves 6 people"
										>
											<img src={eatingPersonIcon} alt="" />
										</button>
										<span className="recipe-tag-text">6 people</span>
									</li>
								</ul>
							</section>
						</section>

						<figure className="recipe-hero-figure">
							<img src={recipe.strMealThumb} alt={recipe.strMeal} />
						</figure>
					</section>
				</header>

				<section className="recipe-main">
					<aside className="ingredients-panel">
						<h2>Ingredients</h2>
						<ul>
							{ingredients.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					</aside>

					<article className="preparation-panel">
						<h2>Preparation</h2>
						{recipe.strInstructions
							?.split(/\r?\n/)
							.filter((p: string) => p.trim() !== "")
							.map((p: string) => (
								<p key={p}>{p}</p>
							))}
					</article>
				</section>
			</div>

			<footer className="recipe-footer">
				<p>© Magic Fridge - 2025</p>
			</footer>
		</main>
	);
}
