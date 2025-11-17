import { useOutletContext } from "react-router";
import RecipeCard from "../components/RecipeCard";
import type { RecipeType } from "../types/recipe";
import "../styles/Favorite.css";

export interface Context {
	favoriteIds: string[];
	toggleFavorite: (idMeal: string) => void;
	recipes: RecipeType[];
	getRecipes: () => void;
}

export default function Favorite() {
	const { favoriteIds, toggleFavorite, recipes } = useOutletContext<Context>();

	const favoritesRecipes = recipes.filter((recipe) =>
		favoriteIds.includes(recipe.idMeal),
	);
	return (
		<>
			<section className="favorites-recipes-cards">
				{favoritesRecipes.map((recipe) => {
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
			</section>
		</>
	);
}
