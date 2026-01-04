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
import Formation from "./pages/Formation.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import IntervenantDashboard from "./pages/IntervenantDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

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
				path: "formation",
				element: <Formation />,
			},
			{
				path: "student-dashboard",
				element: <StudentDashboard />,
			},
			{
				path: "intervenant-dashboard",
				element: <IntervenantDashboard />,
			},
			{
				path: "admin-dashboard",
				element: <AdminDashboard />,
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
