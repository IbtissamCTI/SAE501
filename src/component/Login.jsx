import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Mail, Lock, ArrowRight } from "lucide-react";
import { SocialButtons, Divider } from "../component/AuthComponents.jsx"; 

const Login = () => {
    const navigate = useNavigate();
    
    const [pseudo, setPseudo] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        console.log("Tentative de connexion...");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pseudo, motDePasse }),
            });

            if (response.ok) {
                const data = await response.json();
                
                let userRole = data.role ? data.role.toUpperCase() : "APPRENTI";
                
                if (userRole !== "ADMIN" && userRole !== "INTERVENANT") {
                    userRole = "APPRENTI";
                }

                const userToSave = { ...data, role: userRole };
                localStorage.setItem("user", JSON.stringify(userToSave));
                localStorage.setItem("authData", window.btoa(pseudo + ":" + motDePasse));

                console.log("Rôle final :", userRole);

                if (userRole === "ADMIN") {
                    navigate("/admin");
                } else if (userRole === "INTERVENANT") {
                    navigate("/intervenant");
                } else {
                    console.log("GO -> /dashboard");
                    navigate("/dashboard");
                }

            } else {
                const errorText = await response.text();
                throw new Error(errorText || "Identifiants incorrects");
            }
        } catch (err) {
            console.error(err);
            setError("Pseudo ou mot de passe incorrect.");
        }
    };
    
    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative">
             <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-xl rounded-3xl shadow-2xl p-8 md:p-12 relative z-10">
                <h2 className="text-3xl font-bold mb-2 text-white">Connexion</h2>
                <p className="text-gray-400 mb-8 text-sm">Entrez vos identifiants.</p>

                <form className="space-y-5" onSubmit={handleLogin}>
                    <SocialButtons />
                    <Divider text="Ou avec pseudo" />

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Pseudo</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-zinc-500" size={16} />
                            <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all text-sm" placeholder="Votre pseudo" required />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Mot de passe</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-zinc-500" size={16} />
                            <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all text-sm" placeholder="••••••••••••" required />
                        </div>
                    </div>

                    {error && <p className="text-xs text-red-500 text-center bg-red-500/10 p-2 rounded">{error}</p>}

                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group">
                        Se connecter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
             </div>
        </div>
    );
};

export default Login;