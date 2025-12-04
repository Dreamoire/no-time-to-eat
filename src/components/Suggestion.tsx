import { useRef } from "react";
import type { RecipeType } from "../types/recipe";
import type { Recipe } from "../types/search";
import RecipeCard from "./RecipeCard";
import "../styles/suggestion.css";
import "../styles/RecipeCard.css";

export default function Suggestions({ recipes }: { recipes: Recipe[] }) {
	const randomizedRecipes = useRef<Recipe[] | null>(null);
	if (!randomizedRecipes.current && recipes.length > 0) {
		randomizedRecipes.current = [...recipes]
			.sort(() => Math.random() - 0.5)
			.slice(0, 8);
	}
	const randomRecipes = randomizedRecipes.current ?? [];

	const trackRef = useRef<HTMLDivElement | null>(null);

	const scrollByCards = (direction: "left" | "right") => {
		if (!trackRef.current) return;

		const card = trackRef.current.querySelector<HTMLElement>(".recipe-card");
		const cardWidth = card?.offsetWidth ?? 800;
		const gap = 16;
		const offset = (cardWidth + gap) * 2;

		trackRef.current.scrollBy({
			left: direction === "left" ? -offset : offset,
			behavior: "smooth",
		});
	};

	return (
		<div className="carousel">
			<h1 className="carousel-title">SUGGESTIONS</h1>
			{recipes.length === 0 ? (
				<div className="carousel-loading">Loading...</div>
			) : (
				<div className="carousel-inner">
					<button
						type="button"
						className="carousel-btn carousel-btn-left"
						onClick={() => scrollByCards("left")}
					>
						❮
					</button>

					<div className="carousel-track" ref={trackRef}>
						{randomRecipes.map((recipe) => (
							<div className="carousel-item" key={recipe.idMeal}>
								<RecipeCard recipe={recipe as RecipeType} />
							</div>
						))}
					</div>

					<button
						type="button"
						className="carousel-btn carousel-btn-right"
						onClick={() => scrollByCards("right")}
					>
						❯
					</button>
				</div>
			)}
		</div>
	);
}
