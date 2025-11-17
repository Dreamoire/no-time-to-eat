export type Meal = {
	strMeal: string;
	strMealThumb: string;
	strInstructions: string;
} & Record<string, string | null>;
