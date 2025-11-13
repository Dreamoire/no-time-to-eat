import "./App.css";
import { Outlet } from "react-router";

import NavBar from "./components/NavBar/NavBar";

export default function App() {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}
