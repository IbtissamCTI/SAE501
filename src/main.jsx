import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";

// Pages
import Acceuil from "./pages/Acceuil.jsx";
import Formation from "./pages/Formation.jsx";
import TableauDeBord from "./pages/TableauDeBord.jsx";
import MesCours from "./pages/MesCours.jsx";
import MonProfil from "./pages/MonProfil.jsx";
import SignUp from "./component/SignUp.jsx";

// Import unique pouqFDS>Sr la connefffffffffffffffxion
import Connexion from "./pages/Connexion.jsx"; 

import StudentDashboard from "./pages/StudentDashboard.jsx";
import IntervenantDashboard from "./pages/IntervenantDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Acceuil /> },
            { path: "formation", element: <Formation /> },
            { path: "inscription", element: <SignUp /> },

            // Une seule route pour le flux de connexiogn
            { path: "connexion", element: <Connexion /> },

            // Routes Dashboards
            { path: "student", element: <StudentDashboard /> },
            { path: "intervenant", element: <IntervenantDashboard /> },
            { path: "admin", element: <AdminDashboard /> },

            // Ancien espace
            {
                path: "eleve",
                children: [
                    { index: true, element: <TableauDeBord /> },
                    { path: "cours", element: <MesCours /> },
                    { path: "profil", element: <MonProfil /> },
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