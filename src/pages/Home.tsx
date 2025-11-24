import { useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import Suggestions from "../components/Suggestion";
import { useFavorite } from "../contexts/FavoriteContext";
import "../styles/Home.css";
import type { RecipeType } from "../types/recipe";
import type { Ingredient, Recipe } from "../types/search";
import { recipe_urls } from "../urls/recipe-urls";

async function loadRecipes(): Promise<Recipe[]> {
	const responses = await Promise.all(recipe_urls.map((url) => fetch(url)));
	const results = await Promise.all(responses.map((res) => res.json()));
	let recipes: Recipe[] = results.flatMap((recipe) => recipe.meals || []);

	recipes = recipes.map((recipe) => {
		const ingredients: string[] = [];

		for (let i = 1; i <= 20; i++) {
			const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
			if (
				ingredient &&
				typeof ingredient === "string" &&
				ingredient.trim() !== ""
			) {
				ingredients.push(ingredient);
			}
		}

		return { ...recipe, ingredients };
	});

	return recipes;
}

async function loadIngredients() {
	const response = await fetch(
		"https://www.themealdb.com/api/json/v1/1/list.php?i=list",
	);
	const result = await response.json();
	return result.meals as Ingredient[];
}

export default function Home() {
	const { favoriteRecipes, setFavoriteRecipes } = useFavorite();

	const [ingredients, setIngredients] = useState<Ingredient[]>([]);
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		loadRecipes().then((recipesFromApi) => {
			setRecipes(recipesFromApi);
			const idFavoriteRecipes = favoriteRecipes.map((recipe) => recipe.idMeal);
			const newFavoriteRecipes = recipesFromApi.filter((meal) =>
				idFavoriteRecipes.includes(meal.idMeal),
			);
			setFavoriteRecipes(newFavoriteRecipes as RecipeType[]);
		});
		loadIngredients().then((ingredientsFromAPI) =>
			setIngredients(ingredientsFromAPI),
		);
	}, [favoriteRecipes, setFavoriteRecipes]);
	return (
		<>
			<SearchBar ingredients={ingredients} recipes={recipes} />
			<Suggestions recipes={recipes} />
		</>
	);
}
