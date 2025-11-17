import { useEffect, useRef, useState } from "react";
import cookingTimeIcon from "../assets/images/cooking-time.png";
import eatingPersonIcon from "../assets/images/eating-person.png";
import favoriteIcon from "../assets/images/favoris.png";
import printerIcon from "../assets/images/printer.png";
import CalorieInfo from "../components/CalorieInfo";
import PrintRecipeButton from "../components/PrintRecipeButton";
import "../styles/RecipiesSheet.css";

type Meal = {
	strMeal: string;
	strMealThumb: string;
	strInstructions: string;
} & Record<string, string | null>;

export default function RecipiesSheet() {
	const [meal, setMeal] = useState<Meal | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const recipeId = 52963;

	const printRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const fetchRecipe = async () => {
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
		};

		void fetchRecipe();
	}, []);

	if (loading) {
		return <p className="loading">Loading...</p>;
	}

	if (error || !meal) {
		return <p className="error">Unable to load the recipe.</p>;
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
			<div ref={printRef}>
				<header className="recipe-header">
					<section className="recipe-hero">
						<section className="recipe-hero-text">
							<p>recette</p>
							<h1>{meal.strMeal}</h1>

							<section className="recipe-buttons">
								<div className="recipe-buttons-row recipe-buttons-row--top">
									<button
										type="button"
										className="icon-button icon-button--primary icon-button--favorite"
										title="Favorites"
									>
										<img src={favoriteIcon} alt="Add to favorites" />
									</button>

									<PrintRecipeButton
										printRef={printRef}
										icon={printerIcon}
										className="icon-button icon-button--primary icon-button--print"
									/>
								</div>

								<CalorieInfo meal={meal} className="recipe-kcal-styled" />

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
							<img src={meal.strMealThumb} alt={meal.strMeal} />
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
						{meal.strInstructions
							?.split(/\r?\n/)
							.filter((p) => p.trim() !== "")
							.map((p) => (
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
