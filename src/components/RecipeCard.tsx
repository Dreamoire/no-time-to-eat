import starEmpty from "../assets/images/favoris.png";
import starFull from "../assets/images/favoris_clicked.png";
import type { RecipeType } from "../types/recipe";
import prepTime from "../utils/prepTime";
import "../styles/RecipeCard.css";
import prepIcon from "../assets/images/preparation_time.png";

export interface RecipeCardProps {
	recipe: RecipeType;
	isFavorite: boolean;
	onToggleFavorite: (idMeal: string) => void;
}

export default function RecipeCard({
	recipe,
	isFavorite,
	onToggleFavorite,
}: RecipeCardProps) {
	return (
		<>
			<article className="recipe-card">
				<img
					src={recipe.strMealThumb}
					alt={recipe.strMeal}
					className="recipe-card-picture"
				/>
				<h2>{recipe.strMeal}</h2>
				<hr />
				<span className="recipe-card-infos">
					<p className="recipe-card-prep-time">
						<img src={prepIcon} alt="" width={24} />
						{prepTime(recipe.strInstructions, recipe.idMeal)} min
					</p>
					<button type="button" className="recipe-card-button">
						Recipe
					</button>
					<button
						type="button"
						onClick={() => onToggleFavorite(recipe.idMeal)}
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
