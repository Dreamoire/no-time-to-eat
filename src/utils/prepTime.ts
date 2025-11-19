export default function prepTime(
	strInstructions: string,
	idMeal: string,
): number {
	const wordCount = strInstructions.split(/\s+/);
	const timeOfWords = wordCount.length * 0.25;
	let sum = 0;
	for (let i = 0; i < idMeal.length; i++) {
		sum += idMeal.charCodeAt(i);
	}
	const jitter = sum % 6;
	const totalTime = timeOfWords + jitter;
	return Math.round(totalTime);
}
