import { Outlet, useLocation } from "react-router";
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
			<Outlet />
		</>
	);
}

export default App;
