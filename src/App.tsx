import { Link, Outlet } from "react-router";
import "./App.css";
import IngredientFilter from "./components/IngredientFilter";

function App() {
	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/favorite">Favorite</Link>
			<Outlet />
			<IngredientFilter />
		</>
	);
}

export default App;
