import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../pages/Connexion.jsx";
import { register } from "../data/authService.js";
import { SocialButtons, Divider } from "./AuthComponents.jsx";

const SignUp = () => {
	const navigate = useNavigate();
	const [prenom, setPrenom] = useState("");
	const [nom, setNom] = useState("");
	const [email, setEmail] = useState("");
	const [motDePasse, setMotDePasse] = useState("");
	const [error, setError] = useState(null);

	const handleSignUp = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await register(prenom, nom, email, motDePasse);
			// Si l'inscription réussit, on redirige vers la page de connexion
			navigate("/connexion");
		} catch (err) {
			console.error("Erreur d'inscription:", err);
			setError(
				err.message ||
					"Impossible de créer le compte. Veuillez réessayer."
			);
		}
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
				<SocialButtons />
				<Divider text="Ou s'inscrire avec" />

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1.5">
						<label className="text-xs font-medium text-gray-400 ml-1">
							Prénom
						</label>
						<input
							type="text"
							value={prenom}
							onChange={(e) => setPrenom(e.target.value)}
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="John"
							required
						/>
					</div>
					<div className="space-y-1.5">
						<label className="text-xs font-medium text-gray-400 ml-1">
							Nom
						</label>
						<input
							type="text"
							value={nom}
							onChange={(e) => setNom(e.target.value)}
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="Doe"
							required
						/>
					</div>
				</div>

				<div className="space-y-1.5">
					<label className="text-xs font-medium text-gray-400 ml-1">
						Email
					</label>
					<div className="relative">
						<Mail
							className="absolute left-4 top-3.5 text-zinc-500"
							size={16}
						/>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="john@exemple.com"
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
					<p className="text-[10px] text-gray-500 ml-1">
						Min. 8 caractères
					</p>
				</div>

				{error && (
					<p className="text-xs text-red-500 text-center">
						{error}
					</p>
				)}

				<button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.7)] mt-2"
				>
					Commencer l'aventure
				</button>
			</form>
		</AuthLayout>
	);
};

export default SignUp;
