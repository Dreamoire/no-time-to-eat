import { useEffect, useState } from "react";

type Meal = {
	strMeal: string;
	strMealThumb: string;
	strInstructions: string;
} & Record<string, string | null>;

type NutritionItem = {
	calories: number;
	serving_size_g: number;
};

type NutritionResponse = {
	items: NutritionItem[];
};

const CALORIE_API_KEY = import.meta.env.VITE_CALORIE_NINJA_KEY as string;

// La boucle va jusqu’à 20 car l’API TheMealDB fournit
// 20 emplacements possibles: strIngredient1 à strIngredient20.

function extractIngredients(meal: Meal): string[] {
	const list: string[] = [];

	for (let i = 1; i <= 20; i += 1) {
		const ing = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];

		if (ing && ing.trim() !== "") {
			list.push(`${measure ?? ""} ${ing}`.trim());
		}
	}

	return list;
}

export default function CalorieInfo({
	meal,
	className = "",
}: {
	meal: Meal;
	className?: string;
}) {
	const [caloriesPer100g, setCaloriesPer100g] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const ingredients = extractIngredients(meal);
		if (ingredients.length === 0) {
			setCaloriesPer100g(null);
			return;
		}

		const query = ingredients.join(", ");

		const fetchCalories = async () => {
			try {
				setError(null);

				const response = await fetch(
					`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
						query,
					)}`,
					{
						headers: {
							"X-Api-Key": CALORIE_API_KEY,
						},
					},
				);

				if (!response.ok) {
					throw new Error("API error");
				}

				const data = (await response.json()) as NutritionResponse;

				if (!data.items || data.items.length === 0) {
					setCaloriesPer100g(null);
					return;
				}

				const totalCalories = data.items.reduce(
					(sum, item) => sum + item.calories,
					0,
				);

				const totalWeight = data.items.reduce(
					(sum, item) => sum + item.serving_size_g,
					0,
				);

				if (totalWeight > 0) {
					const per100 = (totalCalories / totalWeight) * 100;
					setCaloriesPer100g(Math.round(per100));
				} else {
					setCaloriesPer100g(null);
				}
			} catch {
				setError("Unable to calculate calories");
				setCaloriesPer100g(null);
			}
		};

		void fetchCalories();
	}, [meal]);

	if (error) {
		return <span className={`recipe-kcal ${className}`}>Calories: N/A</span>;
	}

	if (caloriesPer100g === null) {
		return <span className={`recipe-kcal ${className}`}>Loading...</span>;
	}

	return (
		<span className={`recipe-kcal ${className}`}>
			{caloriesPer100g} kcal / 100g
		</span>
	);
}
