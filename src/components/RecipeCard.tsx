import starEmpty from "../assets/images/favoris_empty.png";
import starFull from "../assets/images/favoris_full.png";
import type { RecipeType } from "../types/recipe";
import prepTime from "../utils/prepTime";
import "../styles/RecipeCard.css";
import { Link } from "react-router";
import prepIcon from "../assets/images/preparation_time.png";
import { useFavorite } from "../contexts/FavoriteContext";

export interface RecipeCardProps {
	recipe: RecipeType;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
	const { favoriteRecipes, setFavoriteRecipes } = useFavorite();
	const isFavorite = favoriteRecipes.includes(recipe);

	function toggleFavorite(recipe: RecipeType) {
		if (!favoriteRecipes.includes(recipe)) {
			setFavoriteRecipes((prev) => [...prev, recipe]);
		} else {
			setFavoriteRecipes(
				favoriteRecipes.filter((e) => {
					return e !== recipe;
				}),
			);
		}
	}

	return (
		<>
			<article className="recipe-card">
				<img
					src={recipe.strMealThumb}
					alt={recipe.strMeal}
					className="recipe-card-picture"
				/>
				<h2>
					{recipe.strMeal.length >= 40
						? `${recipe.strMeal.slice(0, 40)}...`
						: recipe.strMeal}
				</h2>
				<hr />
				<span className="recipe-card-infos">
					<p className="recipe-card-prep-time">
						<img src={prepIcon} alt="" width={24} />
						{prepTime(recipe.strInstructions, recipe.idMeal)} min
					</p>
					<Link
						to={`/recipe/${recipe.idMeal}`}
						className="recipe-card-button"
						target="blank"
					>
						Recipe
					</Link>
					<button
						type="button"
						onClick={() => toggleFavorite(recipe)}
						aria-pressed={isFavorite}
						aria-label={
							isFavorite ? "Remove from favorites" : "Add to favorites"
						}
						className="recipe-card-favorites"
					>
						<img src={isFavorite ? starFull : starEmpty} width={24} alt="" />
					</button>
				</span>
			</article>
		</>
	);
}
