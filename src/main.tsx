import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./index.css";
import FavoriteProvider from "./contexts/FavoriteContext";
import ThemeProvider from "./contexts/ThemeContext";

createRoot(document.getElementById("root") || document.body).render(
	<ThemeProvider>
		<FavoriteProvider>
			<RouterProvider router={router} />
		</FavoriteProvider>
	</ThemeProvider>,
);
