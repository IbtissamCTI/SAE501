import React from "react";
import Connexion from "./Connexion";


const SignUp = () => {
	return (
		<Connexion
			title="Rejoignez l'élite."
			subtitle="Accédez à votre dashboard, suivez vos progrès avec vos mentors."
			footerText="Déjà un compte ?"
			footerLink="Se connecter"
		>
			<form className="space-y-4">
				{/* Boutons Sociaux */}
				<button
					type="button"
					className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm font-medium"
				>
					Continuer avec GitHub
				</button>
				<button
					type="button"
					className="w-full py-3 rounded-lg border border-white/20 hover:bg-white/5 transition flex items-center justify-center gap-2 text-sm font-medium"
				>
					Continuer avec Google
				</button>

				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-white/10"></div>
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-black px-2 text-gray-500">
							Ou avec mail
						</span>
					</div>
				</div>

				{/* Inputs Spécifiques Inscription */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-xs text-gray-400 mb-1">
							Prénom
						</label>
						<input
							type="text"
							className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
							placeholder="John"
						/>
					</div>
					<div>
						<label className="block text-xs text-gray-400 mb-1">
							Nom
						</label>
						<input
							type="text"
							className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none"
							placeholder="Doe"
						/>
					</div>
				</div>

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

				<button className="w-full bg-[#6366f1] hover:bg-[#5558dd] text-white font-bold py-3 rounded-lg mt-2 transition">
					S'inscrire gratuitement
				</button>
			</form>
		</Connexion>
	);
};

export default SignUp;
