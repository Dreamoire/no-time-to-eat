import { useOutletContext } from "react-router";
import RecipeCard from "../components/RecipeCard";
import "../styles/Home.css";
import type { RecipeType } from "../types/recipe";

export interface Context {
	favoriteIds: string[];
	toggleFavorite: (idMeal: string) => void;
	recipes: RecipeType[];
	getRecipes: () => void;
}

export default function Home() {
	const { favoriteIds, toggleFavorite, recipes, getRecipes } =
		useOutletContext<Context>();

	return (
		<>
			<section className="recipes-cards">
				{recipes.map((recipe) => {
					const isFavorite = favoriteIds.includes(recipe.idMeal);
					return (
						<RecipeCard
							recipe={recipe}
							isFavorite={isFavorite}
							onToggleFavorite={toggleFavorite}
							key={recipe.idMeal}
						/>
					);
				})}
				<button type="button" onClick={getRecipes}>
					Get recipes
				</button>
			</section>
		</>
	);
}
