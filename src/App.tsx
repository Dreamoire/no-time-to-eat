import "./App.css";
import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

export default function App() {
	return (
		<>
			<NavBar />
			<Outlet />
			{/* Lien temporaire vers la page RecipiesSheet */}
			<div style={{ padding: "40px", textAlign: "center" }}>
				<a
					href="/recipies-sheet"
					style={{ fontSize: "22px", fontWeight: "600" }}
				>
					Voir la recette
				</a>
			</div>
		</>
	);
}
