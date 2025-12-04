import Cook from "../assets/images/chef.png";
import type { RecipeType } from "../types/recipe";
import prepTime from "../utils/prepTime";
import "../styles/RecipeCard.css";
import { Link } from "react-router";
import prepIcon from "../assets/images/preparation_time.png";
import FavoriteButton from "./FavoriteButton";

export interface RecipeCardProps {
	recipe: RecipeType;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
	return (
		<>
			<article className="recipe-card">
				<Link
					to={`/recipe/${recipe.idMeal}`}
					style={{ textDecoration: "none", color: "black" }}
				>
					<img
						src={recipe.strMealThumb}
						alt={recipe.strMeal}
						className="recipe-card-picture"
					/>
					<h2>
						{recipe.strMeal.length >= 30
							? `${recipe.strMeal.slice(0, 30)}...`
							: recipe.strMeal}
					</h2>
				</Link>
				<hr />
				<span className="recipe-card-infos">
					<p className="recipe-card-prep-time">
						<img src={prepIcon} alt="" width={24} />
						{prepTime(recipe.strInstructions, recipe.idMeal)} min
					</p>
					<Link to={`/recipe/${recipe.idMeal}`} className="recipe-card-button">
						<img src={Cook} width={24} alt="" />
					</Link>
					<FavoriteButton recipe={recipe} />
				</span>
			</article>
		</>
	);
}
