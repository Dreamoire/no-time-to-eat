const CALORIE_API_KEY = import.meta.env.VITE_CALORIE_NINJA_KEY as string;

export type NutritionItem = {
	calories: number;
	serving_size_g: number;
};

export type NutritionResponse = {
	items: NutritionItem[];
};

const CALORIE_API_URL = "https://api.calorieninjas.com/v1/nutrition";

export async function fetchNutrition(
	query: string,
): Promise<NutritionResponse> {
	const response = await fetch(
		`${CALORIE_API_URL}?query=${encodeURIComponent(query)}`,
		{
			headers: {
				"X-Api-Key": CALORIE_API_KEY,
			},
		},
	);

	if (!response.ok) {
		throw new Error("API error");
	}

	return (await response.json()) as NutritionResponse;
}

export function computeCaloriesPer100g(data: NutritionResponse): number | null {
	if (!data.items || data.items.length === 0) {
		return null;
	}

	const totalCalories = data.items.reduce(
		(sum, item) => sum + item.calories,
		0,
	);

	const totalWeight = data.items.reduce(
		(sum, item) => sum + item.serving_size_g,
		0,
	);

	if (totalWeight <= 0) return null;

	const per100 = (totalCalories / totalWeight) * 100;

	return Math.round(per100);
}
