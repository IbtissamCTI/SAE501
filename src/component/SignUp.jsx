import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Star } from "lucide-react";

// --- LAYOUT DESIGN (Gauche fixe, Droite changeante) ---
// Je le remets ici pour que SignUp soit autonome et ne dépende pas de Connexion.jsx
const AuthLayout = ({ title, subtitle, children, footerText, footerActionText, footerActionLink }) => {
    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[600px]">
                {/* GAUCHE : Déco */}
                <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-between bg-zinc-900/50 border-r border-white/5 relative">
                    <div className="z-10">
                        <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-mono font-bold text-lg">N</div>
                            Novatio.
                        </Link>
                    </div>
                    <div className="z-10 relative">
                        <div className="flex gap-1 mb-6 text-yellow-400">
                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={18} fill="currentColor" className="text-yellow-400" />)}
                        </div>
                        <p className="text-xl font-medium leading-relaxed text-gray-200 mb-6">
                            "Rejoindre Novatio a été la meilleure décision de ma carrière. La communauté est incroyable et les projets sont concrets."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-white/20 flex items-center justify-center">
                                {/* Placeholder image ou initiale */}
                                <span className="font-bold text-sm">SB</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Sarah Benali</p>
                                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">UX Designer @ Google</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>
                </div>

                {/* DROITE : Formulaire Inscription */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/80 relative">
                    <div className="max-w-sm mx-auto w-full transition-all duration-500 ease-in-out">
                        <h2 className="text-3xl font-bold mb-2 text-white">{title}</h2>
                        <p className="text-gray-400 mb-8 text-sm">{subtitle}</p>

                        {children}

                        <div className="mt-8 text-center text-sm text-gray-500 pt-6 border-t border-white/5">
                            {footerText} <Link to={footerActionLink} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors underline decoration-transparent hover:decoration-indigo-300 ml-1">{footerActionText}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPOSANT PRINCIPAL ---
const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Simulation de l'inscription (Pas de Back-end requis)
    const handleSignUp = (e) => {
        e.preventDefault();
        setLoading(true);

        // On fait semblant d'attendre le serveur
        setTimeout(() => {
            setLoading(false);
            // Une fois inscrit, on renvoie vers la page de connexion
            navigate("/connexion");
        }, 1000);
    };

    return (
        <AuthLayout
            title="Créer un compte"
            subtitle="Rejoignez la communauté et accédez aux cours gratuits."
            footerText="Vous avez déjà un compte ?"
            footerActionText="Se connecter"
            footerActionLink="/connexion"
        >
            <form className="space-y-4" onSubmit={handleSignUp}>
                
                {/* PRENOM & NOM (Sur une ligne) */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Prénom</label>
                        <input type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all text-sm" placeholder="John" required />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Nom</label>
                        <input type="text" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all text-sm" placeholder="Doe" required />
                    </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400 ml-1">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-zinc-500" size={16} />
                        <input type="email" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all text-sm" placeholder="john@exemple.com" required />
                    </div>
                </div>

                {/* MOT DE PASSE */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400 ml-1">Mot de passe</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-3.5 text-zinc-500" size={16} />
                        <input type="password" className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white focus:border-indigo-500 focus:outline-none transition-all text-sm" placeholder="••••••••" required />
                    </div>
                    <p className="text-[10px] text-gray-500 ml-1">Min. 8 caractères</p>
                </div>

                {}
                <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.7)] mt-2 flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    {loading ? "Création..." : "Commencer l'aventure"}
                    {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </form>
        </AuthLayout>
    );
};

export default SignUp;