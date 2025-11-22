import { useEffect, useState } from "react";
import type { Recipe } from "../types/meal";
import { computeCaloriesPer100g, fetchNutrition } from "../utils/calorieApi";

function extractIngredients(meal: Recipe): string[] {
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

type CalorieInfoProps = {
	meal: Recipe;
	className?: string;
};

export default function CalorieInfo({
	meal,
	className = "",
}: CalorieInfoProps) {
	const [caloriesPer100g, setCaloriesPer100g] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const ingredients = extractIngredients(meal);

		if (ingredients.length === 0) {
			setCaloriesPer100g(null);
			setLoading(false);
			return;
		}

		const query = ingredients.join(", ");

		const loadCalories = async () => {
			try {
				setError(null);
				setLoading(true);

				const data = await fetchNutrition(query);
				const per100 = computeCaloriesPer100g(data);

				setCaloriesPer100g(per100);
			} catch {
				setError("Unable to calculate calories");
				setCaloriesPer100g(null);
			} finally {
				setLoading(false);
			}
		};

		void loadCalories();
	}, [meal]);

	if (loading) {
		return <span className={`recipe-kcal ${className}`}>Loading...</span>;
	}

	if (error || caloriesPer100g === null) {
		return <span className={`recipe-kcal ${className}`}>Calories: N/A</span>;
	}

	return (
		<span className={`recipe-kcal ${className}`}>
			{caloriesPer100g} kcal / 100g
		</span>
	);
}
