import { Link, Outlet } from "react-router";
import "./App.css";
import RecipeFilter from "./components/RecipeFilter";

function App() {
	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/favorite">Favorite</Link>
			<Outlet />
			<RecipeFilter />
		</>
	);
}

export default App;
