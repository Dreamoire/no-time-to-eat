import { Link, Outlet } from "react-router";
import "./App.css";

function App() {
	return (
		<>
			<Link to="/">Home</Link>
			<Link to="/favorite">Favorite</Link>
			<Outlet />
		</>
	);
}

export default App;
