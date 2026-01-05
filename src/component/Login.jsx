import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Ajout de useLocation
import { Mail, Lock, Check, ArrowRight } from "lucide-react";
import AuthLayout from "../pages/Connexion.jsx"; 
// Note: Dans ton fichier actuel, tu importais AuthLayout depuis Connexion. 
// Pour simplifier et éviter les boucles, je vais recréer un layout simple ici ou réutiliser le style.
// Mais pour faire simple : On va garder ta structure.

import { login } from "../data/authService.js";
import { SocialButtons, Divider } from "./AuthComponents.jsx";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Pour récupérer le state
    
    // On récupère la destination envoyée par la page précédente
    // Si on arrive directement sur login sans passer par le choix, on va vers /student par défaut
    const destination = location.state?.destination || "/eleve";

    const [pseudo, setPseudo] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login(pseudo, motDePasse);
            // SUCCÈS : On redirige vers la destination choisie !
            navigate(destination); 

        } catch (err) {
            console.error("Erreur de connexion:", err);
            setError(err.message || "Impossible de se connecter.");
        }
    };

    // Note : Ici on réutilise AuthLayout. Assure-toi que AuthLayout est bien exporté dans un fichier séparé
    // ou alors copie le composant AuthLayout au début de ce fichier aussi si besoin.
    // Pour l'instant je suppose que tu l'as exporté depuis Connexion.jsx comme tu l'avais fait.
    
    return (
        // On importe AuthLayout depuis "../pages/Connexion.jsx" (Si c'est là qu'il est défini)
        // ATTENTION : Si AuthLayout est DANS Connexion.jsx mais pas exporté seul, ça va poser souci.
        // IDÉALEMENT : Mets le composant AuthLayout degsdfans un fichier à part (ex: src/component/AuthLayout.jsx)
        // MAIS POUR FAIRE MARCHER TON CODE MAINTENANT, je vais supposer que tu peux l'importer.
        
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative">
             {/* Je remets le design ici vite fait pour être sûr que ça marche sans erreur d'import */}
             <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-xl rounded-3xl shadow-2xl p-8 md:p-12 relative z-10">
                <h2 className="text-3xl font-bold mb-2 text-white">Bon retour</h2>
                <p className="text-gray-400 mb-8 text-sm">Heureux de vous revoir. Entrez vos identifiants pour accéder à : <span className="text-indigo-400 font-bold">{destination.replace('/', '').toUpperCase()}</span></p>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <SocialButtons />
                    <Divider text="Ou avec email" />

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Pseudo</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-zinc-500" size={16} />
                            <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all text-sm" placeholder="nom.prenom" required />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Mot de passe</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-zinc-500" size={16} />
                            <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all text-sm" placeholder="••••••••••••" required />
                        </div>
                    </div>

                    {error && <p className="text-xs text-red-500 text-center">{error}</p>}

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group">
                        Se connecter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
             </div>
        </div>
    );
};

export default Login;