import { Outlet, useLocation } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import ScrollToTopButton from "./components/ScrollToTopButton";

import "./styles/reset.css";
import "./index.css";
import "./App.css";

function App() {
	const location = useLocation();
	const hideHeader = location.pathname.startsWith("/recipe/");

	return (
		<div className="app-root">
			<NavBar />
			{!hideHeader && <Header />}
			<Outlet />
			<ScrollToTopButton />
			<Footer />
		</div>
	);
}

export default App;
