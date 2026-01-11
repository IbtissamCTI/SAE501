import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";

import Acceuil from "./pages/Acceuil.jsx";
import Formation from "./pages/Formation.jsx";
import SignUp from "./component/SignUp.jsx";
import Connexion from "./pages/Connexion.jsx"; 

import StudentDashboard from "./pages/StudentDashboard.jsx";
import IntervenantDashboard from "./pages/IntervenantDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import ProtectedRoute from "./component/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Acceuil /> },
            { path: "formation", element: <Formation /> },
            { path: "formations", element: <Formation /> },
            { path: "inscription", element: <SignUp /> },
            { path: "connexion", element: <Connexion /> },

            
            { 
                path: "dashboard", 
                element: <StudentDashboard /> 
            },

            { 
                path: "intervenant", 
                element: (
                    <ProtectedRoute allowedRoles={['INTERVENANT']}>
                        <IntervenantDashboard />
                    </ProtectedRoute>
                ) 
            },
            { 
                path: "admin", 
                element: (
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <AdminDashboard />
                    </ProtectedRoute>
                ) 
            },

            { path: "*", element: <div style={{color:'white', padding:50}}><h1>ERREUR 404</h1><p>Route non trouvée</p></div> }
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);