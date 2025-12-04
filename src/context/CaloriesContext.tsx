import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import type { Recipe } from "../types/meal";
import { computeCaloriesPer100g, fetchNutrition } from "../utils/calorieApi";

type CaloriesByMealId = Record<string, number | null>;

type CaloriesContextValue = {
	caloriesByMealId: CaloriesByMealId;
	getCaloriesPer100gForMeal: (meal: Recipe) => Promise<number | null>;
};

const CaloriesContext = createContext<CaloriesContextValue | undefined>(
	undefined,
);

type CaloriesProviderProps = {
	children: ReactNode;
};

function extractIngredients(meal: Recipe): string[] {
	const list: string[] = [];

	for (let i = 1; i <= 20; i += 1) {
		const ingredientKey = `strIngredient${i}` as keyof typeof meal;
		const measureKey = `strMeasure${i}` as keyof typeof meal;

		const ing = meal[ingredientKey] as string | null | undefined;
		const measure = meal[measureKey] as string | null | undefined;

		if (ing && ing.trim() !== "") {
			list.push(`${measure ?? ""} ${ing}`.trim());
		}
	}

	return list;
}

export function CaloriesProvider({ children }: CaloriesProviderProps) {
	const [caloriesByMealId, setCaloriesByMealId] = useState<CaloriesByMealId>(
		{},
	);

	const getCaloriesPer100gForMeal = useCallback(
		async (meal: Recipe) => {
			const mealId = meal.idMeal;

			if (!mealId) {
				return null;
			}

			if (mealId in caloriesByMealId) {
				return caloriesByMealId[mealId];
			}

			const ingredients = extractIngredients(meal);

			if (ingredients.length === 0) {
				setCaloriesByMealId((prev) => ({
					...prev,
					[mealId]: null,
				}));
				return null;
			}

			const query = ingredients.join(", ");
			const data = await fetchNutrition(query);
			const per100 = computeCaloriesPer100g(data);

			setCaloriesByMealId((prev) => ({
				...prev,
				[mealId]: per100,
			}));

			return per100;
		},
		[caloriesByMealId],
	);

	const value = useMemo(
		() => ({
			caloriesByMealId,
			getCaloriesPer100gForMeal,
		}),
		[caloriesByMealId, getCaloriesPer100gForMeal],
	);

	return (
		<CaloriesContext.Provider value={value}>
			{children}
		</CaloriesContext.Provider>
	);
}

export function useCalories() {
	const context = useContext(CaloriesContext);

	if (!context) {
		throw new Error("useCalories must be used within a CaloriesProvider");
	}

	return context;
}
