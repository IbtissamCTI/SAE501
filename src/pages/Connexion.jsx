import React, { useState } from "react";
import { Star, User, Shield, Briefcase, ArrowRight, ArrowLeft, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[600px]">
                <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-between bg-zinc-900/50 border-r border-white/5 relative">
                    <div className="z-10">
                        <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-mono font-bold text-lg">N</div>
                            Novatio.
                        </Link>
                    </div>
                    <div className="z-10 relative">
                        <div className="absolute -top-10 -left-4 text-6xl text-indigo-500/20 font-serif">"</div>
                        <div className="flex gap-1 mb-6 text-yellow-400">
                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={18} fill="currentColor" className="text-yellow-400" />)}
                        </div>
                        <p className="text-xl font-medium leading-relaxed text-gray-200 mb-6">
                            J'étais perdu dans les tutos YouTube. Novatio m'a donné la structure et le mentorat qu'il me fallait. J'ai signé mon CDI 2 semaines après la fin du bootcamp.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-white/20">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Thomas Durand</p>
                                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Développeur Front-End @ Qonto</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>
                </div>

                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/80 relative">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Connexion = () => {
    const [view, setView] = useState("selection");
    
    const [roleTarget, setRoleTarget] = useState("/dashboard"); 
    const [roleName, setRoleName] = useState("Élève");

    const navigate = useNavigate();

    const [pseudo, setPseudo] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState(null);

    const handleChoice = (path, name) => {
        const realPath = path === "/student" || path === "/eleve" ? "/dashboard" : path;
        
        setRoleTarget(realPath);
        setRoleName(name);
        setView("login"); 
        setError(null);
    };

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

                console.log("Connecté en tant que :", userRole);

                if (userRole === "ADMIN") {
                    navigate("/admin");
                } else if (userRole === "INTERVENANT") {
                    navigate("/intervenant");
                } else {
                    console.log("Redirection vers le dashboard Apprenti");
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
        <AuthLayout>
            <div className="max-w-sm mx-auto w-full transition-all duration-500 ease-in-out">
                
                {view === "selection" && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-3xl font-bold mb-2 text-white">Bienvenue</h2>
                        <p className="text-gray-400 mb-8 text-sm">Choisissez votre espace pour continuer.</p>

                        <div className="space-y-4">
                            <button onClick={() => handleChoice("/dashboard", "Espace Élève")} className="w-full flex items-center justify-between p-4 rounded-xl bg-[#1F1F23] border border-white/10 hover:border-indigo-500 hover:bg-[#27272A] transition group text-left">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition"><User size={20} /></div>
                                    <div><span className="block font-bold text-white text-sm">Espace Élève</span><span className="text-xs text-gray-500">Accéder à mes cours</span></div>
                                </div>
                                <ArrowRight size={16} className="text-gray-600 group-hover:text-white transition"/>
                            </button>

                            <button onClick={() => handleChoice("/intervenant", "Intervenant")} className="w-full flex items-center justify-between p-4 rounded-xl bg-[#1F1F23] border border-white/10 hover:border-emerald-500 hover:bg-[#27272A] transition group text-left">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition"><Briefcase size={20} /></div>
                                    <div><span className="block font-bold text-white text-sm">Intervenant</span><span className="text-xs text-gray-500">Gestion des classes</span></div>
                                </div>
                                <ArrowRight size={16} className="text-gray-600 group-hover:text-white transition"/>
                            </button>

                            <button onClick={() => handleChoice("/admin", "Admin")} className="w-full flex items-center justify-between p-4 rounded-xl bg-[#1F1F23] border border-white/10 hover:border-purple-500 hover:bg-[#27272A] transition group text-left">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition"><Shield size={20} /></div>
                                    <div><span className="block font-bold text-white text-sm">Admin</span><span className="text-xs text-gray-500">Administration</span></div>
                                </div>
                                <ArrowRight size={16} className="text-gray-600 group-hover:text-white transition"/>
                            </button>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500 flex flex-col gap-2">
                            <p>Pas encore inscrit ? <Link to="/inscription" className="text-indigo-400 hover:text-indigo-300 font-medium underline ml-1">Créer un compte</Link></p>
                            <Link to="/" className="text-gray-600 hover:text-white transition text-xs">Retour à l'accueil</Link>
                        </div>
                    </div>
                )}

                {view === "login" && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <button onClick={() => setView("selection")} className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 text-sm transition">
                            <ArrowLeft size={16} /> Retour au choix
                        </button>

                        <h2 className="text-3xl font-bold mb-2 text-white">Connexion</h2>
                        <p className="text-gray-400 mb-8 text-sm">Accès : <span className="text-indigo-400 font-bold">{roleName}</span></p>

                        <form className="space-y-5" onSubmit={handleLogin}>
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
                )}

            </div>
        </AuthLayout>
    );
};

export default Connexion;