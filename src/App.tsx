import { Link, Outlet, useLocation } from "react-router";
import "./App.css";
import "./index.css";
import "./styles/reset.css";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

function App() {
	const location = useLocation();
	const hideHeader = location.pathname.startsWith("/recipe/");

	return (
		<>
			<NavBar />
			{!hideHeader && <Header />}
			<Link to="/">Home</Link>
			<Link to="/favorite">Favorite</Link>
			<Outlet />
		</>
	);
}

export default App;
