import React from "react";
import Connexion from "./Connexion";


const Login = () => {
	return (
		<Connexion
			title="Bon retour."
			subtitle="Entrez vos identifiants pour continuer."
			footerText="Pas encore de compte ?"
			footerLink="S'inscrire"
		>
			<form className="space-y-4">
				{/* Inputs Spécifiques Connexion */}
				{/* On peut remettre les boutons sociaux ici si on veut, ou juste le form */}

				<div>
					<label className="block text-xs text-gray-400 mb-1">
						Email
					</label>
					<input
						type="email"
						className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
						placeholder="nom@exemple.com"
					/>
				</div>

				<div>
					<label className="block text-xs text-gray-400 mb-1">
						Mot de passe
					</label>
					<input
						type="password"
						className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
						placeholder="••••••••"
					/>
				</div>

				<div className="flex justify-between items-center text-xs text-gray-400">
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							className="rounded bg-zinc-900 border-white/20"
						/>
						Se souvenir de moi
					</label>
					<a href="#" className="hover:text-white">
						Mot de passe oublié ?
					</a>
				</div>

				<button className="w-full bg-[#6366f1] hover:bg-[#5558dd] text-white font-bold py-3 rounded-lg mt-2 transition">
					Se connecter
				</button>
			</form>
		</Connexion>
	);
};

export default Login;
