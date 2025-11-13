import { useState } from "react";
import type { ChangeEvent } from "react";
import "../styles/ingredient_filter.css";

function IngredientFilter() {
	const [time, setTime] = useState<number>(50);
	const selectedTime = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(Number(e.target.value));
	};

	const [ing, setNbrIng] = useState<number>(2);
	const selectedIng = (e: ChangeEvent<HTMLInputElement>) => {
		setNbrIng(Number(e.target.value));
	};

	const [calorie, setCalorie] = useState<number>(500);
	const selectedCalorie = (e: ChangeEvent<HTMLInputElement>) => {
		setCalorie(Number(e.target.value));
	};

	const [compatibility, setCompatibility] = useState<number>(50);
	const selectedCompatibility = (e: ChangeEvent<HTMLInputElement>) => {
		setCompatibility(Number(e.target.value));
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
						<div className="input-form">
							<input
								type="number"
								min="0"
								max="100"
								step="10"
								className="input"
								value={compatibility}
								onChange={selectedCompatibility}
							/>
							<label htmlFor="number">Compatibilité en %</label>
						</div>
						<label htmlFor="time">calories max : {calorie} kcal</label>
						<input
							type="range"
							min="0"
							max="1000"
							step="1"
							value={calorie}
							onChange={selectedCalorie}
							className="stick-filter"
						/>
					</div>
				)}
			</div>
		</>
	);
}

export default IngredientFilter;
