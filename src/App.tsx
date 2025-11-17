import { Link, Outlet } from "react-router";
import "./App.css";
import { useState } from "react";
import type { RecipeType } from "./types/recipe";

function App() {
	const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

	function toggleFavorite(idMeal: string) {
		if (!favoriteIds.includes(idMeal)) {
			setFavoriteIds([...favoriteIds, idMeal]);
		} else if (favoriteIds.includes(idMeal)) {
			setFavoriteIds(
				favoriteIds.filter((element) => {
					return element !== idMeal;
				}),
			);
		}
	}
	const [recipes, setRecipes] = useState<RecipeType[]>([]);

	const getRecipes = () => {
		fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
			.then((response) => response.json())
			.then((data) => {
				setRecipes(data.meals);
			});
	};

	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/favorite">Favorite</Link>
			<Outlet
				context={{
					favoriteIds: favoriteIds,
					toggleFavorite: toggleFavorite,
					recipes: recipes,
					getRecipes: getRecipes,
				}}
			/>
		</>
	);
}

export default App;
