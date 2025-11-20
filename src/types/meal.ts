export type Recipe = {
	strMeal: string;
	strMealThumb: string;
	strInstructions: string;
} & Record<string, string | null>;
