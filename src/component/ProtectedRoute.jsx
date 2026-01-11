import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    
    // 1. Récupération de l'utilisateur
    const userStr = localStorage.getItem('user');
    
    // Debug : On affiche ce qu'on trouve
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

    // Normalisation du rôle (Majuscules, sans espaces)
    const userRole = user.role ? user.role.toUpperCase().trim() : "INCONNU";
    console.log("Rôle utilisateur interprété :", userRole);

    // 2. Vérification du rôle
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        console.warn(`>> ACCÈS REFUSÉ. Le rôle '${userRole}' n'est pas dans la liste ${JSON.stringify(allowedRoles)}`);
        
        // Redirection de secours selon le rôle réel
        if (userRole === 'ADMIN') return <Navigate to="/admin" replace />;
        if (userRole === 'INTERVENANT') return <Navigate to="/intervenant" replace />;
        // Pour tout le reste (Apprenti, Etudiant, etc.), on renvoie au dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // 3. Tout est bon
    console.log(">> Accès autorisé !");
    return children;
};

export default ProtectedRoute;