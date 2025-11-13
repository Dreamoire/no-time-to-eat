import { useState } from "react";
import type { ChangeEvent } from "react";
import "../styles/recipe_filter.css";

function RecipeFilter() {
	const [time, setTime] = useState<number>(50);
	const selectedTime = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(Number(e.target.value));
	};

	const [ing, setNbrIng] = useState<number>(2);
	const selectedIng = (e: ChangeEvent<HTMLInputElement>) => {
		setNbrIng(Number(e.target.value));
	};

	const [open, setOpen] = useState(false);
	const toggleMenu = () => {
		setOpen(!open);
	};

	return (
		<>
			<div className="recipe-filter">
				<button type="button" onClick={toggleMenu} className="button-filter">
					<img src="src\assets\images\filter.svg" alt="" />
				</button>
				{open && (
					<div className="input-filter">
						<label htmlFor="time">Temps de préparation : {time} min</label>
						<input
							type="range"
							min="0"
							max="240"
							step="1"
							value={time}
							onChange={selectedTime}
							className="stick-filter"
						/>
						<div className="input-form">
							<input
								type="number"
								min="0"
								className="input"
								value={ing}
								onChange={selectedIng}
							/>
							<label htmlFor="number">Nombre d'ingrédients</label>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default RecipeFilter;
