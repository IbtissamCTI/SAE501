import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Acceuil from "./pages/Acceuil.jsx";
import Login from "./component/Login.jsx";
import SignUp from "./component/SignUp.jsx";
import TableauDeBord from "./pages/TableauDeBord.jsx";
import MesCours from "./pages/MesCours.jsx";
import MonProfil from "./pages/MonProfil.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Acceuil />,
			},
			{
				path: "connexion",
				element: <Login />,
			},
			{
				path: "inscription",
				element: <SignUp />,
			},
			{
				path: "eleve",
				children: [
					{
						index: true,
						element: <TableauDeBord />,
					},
					{
						path: "cours",
						element: <MesCours />,
					},
					{
						path: "profil",
						element: <MonProfil />,
					},
				],
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
