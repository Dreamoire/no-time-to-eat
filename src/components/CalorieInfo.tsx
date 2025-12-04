import { useEffect, useState } from "react";
import type { Recipe } from "../types/meal";
import { computeCaloriesPer100g, fetchNutrition } from "../utils/calorieApi";

function extractIngredients(meal: Recipe): string[] {
	const list: string[] = [];
	const listFinal: string[] = [];

	const ing = Object.values(meal).slice(9, 29);
	const measure = Object.values(meal).slice(29, 49);

	for (let i = 0; i <= 19; i++) {
		if (
			typeof ing[i] !== "string" ||
			ing[i] !== "" ||
			ing[i] !== " " ||
			typeof measure[i] === "string" ||
			measure[i] !== "" ||
			measure[i] !== " "
		) {
			const calorieSearch = ((measure[i] as string) + ing[i]) as string;
			list.push(calorieSearch);
		}
	}

	for (let i = 0; i <= 19; i++) {
		if (list[i] !== " " && list[i] !== "") {
			listFinal.push(list[i]);
		}
	}

	return listFinal;
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
