import RecipeCard from "../components/RecipeCard";
import { useFavorite } from "../contexts/FavoriteContext";
import "../styles/Favorite.css";

export default function Favorite() {
	const { favoriteRecipes } = useFavorite();
	return (
		<>
			<section className="favorites-recipes-cards">
				{favoriteRecipes.map((recipe) => {
					return <RecipeCard recipe={recipe} key={recipe.idMeal} />;
				})}
			</section>
		</>
	);
}
