import starEmpty from "../assets/images/favoris_empty.png";
import starFull from "../assets/images/favoris_full.png";
import { useFavorite } from "../contexts/FavoriteContext";
import type { RecipeType } from "../types/recipe";

export default function FavoriteButton({ recipe }: { recipe: RecipeType }) {
	const { favoriteRecipes, setFavoriteRecipes } = useFavorite();
	const favoritesId = favoriteRecipes.map((recipe) => recipe.idMeal);
	const isFavorite = favoritesId.includes(recipe.idMeal);

	function toggleFavorite(recipe: RecipeType) {
		if (!favoritesId.includes(recipe.idMeal)) {
			setFavoriteRecipes((prev) => [...prev, recipe]);
		} else {
			setFavoriteRecipes(
				favoriteRecipes.filter((e) => {
					return e.idMeal !== recipe.idMeal;
				}),
			);
		}
	}

	return (
		<button
			type="button"
			onClick={() => toggleFavorite(recipe)}
			aria-pressed={isFavorite}
			aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
			className="recipe-card-favorites"
		>
			<img src={isFavorite ? starFull : starEmpty} width={24} alt="" />
		</button>
	);
}
