import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import cookingTimeIcon from "../assets/images/cooking-time.png";
import eatingPersonIcon from "../assets/images/eating-person.png";
import printerIcon from "../assets/images/printer.png";
import CalorieInfo from "../components/CalorieInfo";
import type { Recipe } from "../types/meal";

import "../styles/RecipeSheet.css";
import FavoriteButton from "../components/FavoriteButton";
import type { RecipeType } from "../types/recipe";
import prepTime from "../utils/prepTime";

export default function RecipeSheet() {
	const [recipe, setRecipe] = useState<RecipeType | null>(null);
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
	const ingredientsLoading: string[] = [];

	const ing = Object.values(recipe).slice(9, 29);
	const measure = Object.values(recipe).slice(29, 49);
	const space = " - ";

	for (let i = 0; i <= 19; i++) {
		if (
			typeof ing[i] !== "string" ||
			ing[i] !== "" ||
			ing[i] !== " " ||
			typeof measure[i] === "string" ||
			measure[i] !== "" ||
			measure[i] !== " "
		) {
			const calorieSearch = ((ing[i] as string) +
				space +
				(measure[i] === " " ? "to taste" : measure[i])) as string;
			ingredientsLoading.push(calorieSearch);
		}
	}

	for (let i = 0; i <= 19; i++) {
		if (
			ingredientsLoading[i] !== " " &&
			ingredientsLoading[i] !== "" &&
			typeof ingredientsLoading[i] === "string" &&
			ingredientsLoading[i] !== " - " &&
			ingredientsLoading[i] !== " -  " &&
			ingredientsLoading[i] !== " - to taste"
		) {
			ingredients.push(ingredientsLoading[i]);
		}
	}

	const title = recipe.strMeal;
	const isLongTitle = title.length > 38;

	const prTime: number = prepTime(recipe.strInstructions, recipe.idMeal);

	return (
		<main className="recipe-sheet">
			<div ref={printRef}>
				<header className="recipe-header">
					<section className="recipe-hero">
						<section className="recipe-hero-inner">
							<section
								className={
									isLongTitle
										? "recipe-hero-text recipe-hero-text--dense"
										: "recipe-hero-text"
								}
							>
								<h1
									className={
										isLongTitle
											? "recipe-title recipe-title--long"
											: "recipe-title"
									}
								>
									{recipe.strMeal}
								</h1>

								<section className="recipe-buttons">
									<div className="recipe-buttons-row recipe-buttons-row--top">
										<FavoriteButton recipe={recipe} />
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
											<div
												className="icon-static icon-static--info"
												aria-hidden="true"
											>
												<img src={cookingTimeIcon} alt="cooking time" />
											</div>
											<span className="recipe-tag-text">{prTime} min</span>
										</li>

										<li title="serves 6 people">
											<div
												className="icon-static icon-static--info"
												aria-hidden="true"
											>
												<img src={eatingPersonIcon} alt="serves" />
											</div>
											<span className="recipe-tag-text">6 people</span>
										</li>
									</ul>
								</section>
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
		</main>
	);
}
