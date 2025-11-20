import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { RecipeType } from "../types/recipe";

type FavoriteState = {
	favoriteRecipes: RecipeType[];
	setFavoriteRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const FavoriteContext = createContext<FavoriteState>({
	favoriteRecipes: [],
	setFavoriteRecipes: () => {},
});

export default function FavoriteProvider({
	children,
}: { children: ReactNode }) {
	const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([]);

	return (
		<FavoriteContext.Provider value={{ favoriteRecipes, setFavoriteRecipes }}>
			{children}
		</FavoriteContext.Provider>
	);
}

export const useFavorite = () => {
	return useContext(FavoriteContext);
};
