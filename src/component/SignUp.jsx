import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { register } from "../data/authService.js";

// --- 1. COMPOSANT AUTHLAYOUT ---
const AuthLayout = ({ title, subtitle, children, footerText, footerActionText, footerActionLink }) => {
    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
                {/* GAUCHE: Déco */}
                <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-between bg-zinc-900/50 border-r border-white/5">
                    <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-mono">N</div>
                        Novatio.
                    </Link>
                    <div>
                        <div className="flex gap-1 mb-4 text-yellow-400">
                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-lg text-gray-200 italic">"La meilleure plateforme pour apprendre le dev."</p>
                    </div>
                </div>
                {/* DROITE: Formulaire */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-black/80">
                    <h2 className="text-3xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-400 mb-8 text-sm">{subtitle}</p>
                    {children}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        {footerText} <Link to={footerActionLink} className="text-indigo-400 underline">{footerActionText}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 2. COMPOSANT SIGNUP ADAPTÉ À TON BACKEND ---
const SignUp = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email: "",
        motDePasse: ""
        // ❌ PAS DE PSEUDO - ton backend le génère automatiquement
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Validation côté client
        if (!formData.prenom.trim() || !formData.nom.trim()) {
            setError("Le prénom et le nom sont obligatoires");
            setLoading(false);
            return;
        }

        if (!formData.email.includes('@')) {
            setError("Email invalide");
            setLoading(false);
            return;
        }

        if (formData.motDePasse.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            setLoading(false);
            return;
        }

        try {
            console.log("📤 Envoi des données:", formData);

            // ✅ On envoie SANS pseudo (ton backend le génère)
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prenom: formData.prenom,
                    nom: formData.nom,
                    email: formData.email,
                    motDePasse: formData.motDePasse
                    // Pas de pseudo, pas de role
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Erreur lors de l'inscription");
            }

            const data = await response.json();
            console.log("✅ Inscription réussie:", data);

            setSuccess(true);
            
            // Redirection après 1.5 secondes
            setTimeout(() => {
                navigate("/connexion");
            }, 1500);

        } catch (err) {
            console.error("❌ Erreur complète:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Créer un compte"
            subtitle="Rejoignez la communauté Novatio."
            footerText="Déjà inscrit ?"
            footerActionText="Se connecter"
            footerActionLink="/connexion"
        >
            <form className="space-y-4" onSubmit={handleSignUp}>
                {/* Message d'erreur */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 rounded-xl p-3 text-sm text-red-400">
                        ⚠️ {error}
                    </div>
                )}

                {/* Message de succès */}
                {success && (
                    <div className="bg-green-500/10 border border-green-500 rounded-xl p-3 text-sm text-green-400">
                        ✅ Compte créé avec succès ! Redirection...
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        type="text"
                        placeholder="Prénom"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                        required
                        disabled={loading}
                    />
                    <input
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        type="text"
                        placeholder="Nom"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                        required
                        disabled={loading}
                    />
                </div>

                {/* ✅ INFO : Pseudo généré automatiquement */}
                <div className="text-xs text-gray-500 -mt-2">
                    💡 Votre pseudo sera : {formData.nom && formData.prenom ? `${formData.nom.toLowerCase()}.${formData.prenom.toLowerCase()}` : "nom.prenom"}
                </div>

                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    required
                    disabled={loading}
                />

                <input
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    type="password"
                    placeholder="Mot de passe (min. 6 caractères)"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    required
                    disabled={loading}
                />

                <button
                    disabled={loading || success}
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Création en cours..." : success ? "Compte créé !" : "S'inscrire"}
                </button>
            </form>
        </AuthLayout>
    );
};

export default SignUp;