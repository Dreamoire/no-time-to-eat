import "./App.css";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

export default function App() {
	return (
		<>
			<NavBar />
			<Outlet />
			{/* Lien temporaire vers la page RecipiesSheet */}
			<div>
				<a href="/recipe/1">Voir la recette</a>
			</div>
		</>
	);
}
