import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./index.css";

createRoot(document.getElementById("root") || document.body).render(
	<RouterProvider router={router} />,
);
