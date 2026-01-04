import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Check, ArrowRight } from "lucide-react";
import AuthLayout from "../pages/Connexion.jsx";
import { login } from "../data/authService.js";
import { SocialButtons, Divider } from "./AuthComponents.jsx";

const Login = () => {
	const navigate = useNavigate();
	const [pseudo, setPseudo] = useState("");
	const [motDePasse, setMotDePasse] = useState("");
	const [error, setError] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await login(pseudo, motDePasse);
			// La fonction login du service stocke déjà les infos user dans le localStorage.
			// On redirige l'utilisateur vers son espace.
			navigate("/eleve"); 

		} catch (err) {
			console.error("Erreur de connexion:", err);
			setError(err.message || "Impossible de se connecter. Veuillez réessayer.");
		}
	};

	return (
		<AuthLayout
			title="Bon retour"
			subtitle="Heureux de vous revoir. Entrez vos identifiants."
			footerText="Pas encore de compte ?"
			footerActionText="Créer un compte"
			footerActionLink="/inscription"
		>
			<form className="space-y-5" onSubmit={handleLogin}>
				<SocialButtons />
				<Divider text="Ou avec email" />

				<div className="space-y-1.5">
					<label className="text-xs font-medium text-gray-400 ml-1">
						pseudo
					</label>
					<div className="relative">
						<Mail
							className="absolute left-4 top-3.5 text-zinc-500"
							size={16}
						/>
						<input
							type="text"
							value={pseudo}
							onChange={(e) => setPseudo(e.target.value)}
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="nom.prenom"
							required
						/>
					</div>
				</div>

				<div className="space-y-1.5">
					<label className="text-xs font-medium text-gray-400 ml-1">
						Mot de passe
					</label>
					<div className="relative">
						<Lock
							className="absolute left-4 top-3.5 text-zinc-500"
							size={16}
						/>
						<input
							type="password"
							value={motDePasse}
							onChange={(e) => setMotDePasse(e.target.value)}
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="••••••••••••"
							required
						/>
					</div>
				</div>

				<div className="flex items-center justify-between text-xs">
					<label className="flex items-center gap-2 cursor-pointer group">
						<div className="relative flex items-center">
							<input
								type="checkbox"
								className="peer appearance-none w-4 h-4 rounded border border-zinc-700 bg-zinc-900/50 checked:bg-indigo-600 checked:border-indigo-600 transition-colors"
							/>
							<Check
								className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none"
								strokeWidth={3}
							/>
						</div>
						<span className="text-gray-400 group-hover:text-gray-300 transition-colors">
							Se souvenir de moi
						</span>
					</label>
					<a
						href="#"
						className="text-gray-400 hover:text-white transition-colors"
					>
						Mot de passe oublié ?
					</a>
				</div>
				
				{error && (
					<p className="text-xs text-red-500 text-center">
						{error}
					</p>
				)}

				<button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.7)] flex items-center justify-center gap-2 group"
				>
					Se connecter
					<ArrowRight
						size={18}
						className="group-hover:translate-x-1 transition-transform"
					/>
				</button>
			</form>
		</AuthLayout>
	);
};

export default Login;
