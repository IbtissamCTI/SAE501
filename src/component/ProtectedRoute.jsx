import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    
    const userStr = localStorage.getItem('user');
    
    console.log("--- ProtectedRoute Check ---");
    console.log("Page demandée :", location.pathname);
    console.log("Rôles autorisés :", allowedRoles);
    console.log("User brut en stockage :", userStr);

    if (!userStr) {
        console.warn(">> Pas d'utilisateur trouvé -> Redirection Connexion");
        return <Navigate to="/connexion" state={{ from: location }} replace />;
    }

    let user;
    try {
        user = JSON.parse(userStr);
    } catch (e) {
        console.error(">> Erreur lecture JSON user -> Redirection Connexion");
        localStorage.clear();
        return <Navigate to="/connexion" replace />;
    }

    const userRole = user.role ? user.role.toUpperCase().trim() : "INCONNU";
    console.log("Rôle utilisateur interprété :", userRole);

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        console.warn(`>> ACCÈS REFUSÉ. Le rôle '${userRole}' n'est pas dans la liste ${JSON.stringify(allowedRoles)}`);
        
        if (userRole === 'ADMIN') return <Navigate to="/admin" replace />;
        if (userRole === 'INTERVENANT') return <Navigate to="/intervenant" replace />;
        return <Navigate to="/dashboard" replace />;
    }

    console.log(">> Accès autorisé !");
    return children;
};

export default ProtectedRoute;