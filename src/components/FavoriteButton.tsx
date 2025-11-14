import { useEffect, useState } from "react";
import starEmpty from "../assets/icons/star-empty.png";
import starFilled from "../assets/icons/star-filled.png";

interface FavoriteButtonProps {
	mealId: string;
}

export default function FavoriteButton({ mealId }: FavoriteButtonProps) {
	const [isFav, setIsFav] = useState(false);

	useEffect(() => {
		const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
		setIsFav(savedFavs.includes(mealId));
	}, [mealId]);

	const toggleFavorite = () => {
		const savedFavs: string[] = JSON.parse(
			localStorage.getItem("favorites") || "[]",
		);
		let newFavs: string[] = [];

		if (isFav) {
			newFavs = savedFavs.filter((id: string) => id !== mealId);
		} else {
			newFavs = [...savedFavs, mealId];
		}

		localStorage.setItem("favorites", JSON.stringify(newFavs));
		setIsFav(!isFav);
	};

	return (
		<button
			type="button"
			className="icon-button"
			onClick={toggleFavorite}
			aria-label={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
		>
			<img src={isFav ? starFilled : starEmpty} alt="Favoris" />
		</button>
	);
}
