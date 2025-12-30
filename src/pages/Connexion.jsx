import React from "react";
import { Star } from "lucide-react"; // Si tu as lucide, sinon svg

// Ce composant sert de coquille vide pour Login ET Inscription
const connexion = ({ title, subtitle, children, footerLink, footerText }) => {
	return (
		<div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
			{/* Fond avec effet "Code" (Décoration) */}
			<div className="absolute inset-0 opacity-20 pointer-events-none">
				<div className="absolute top-0 left-0 p-10 font-mono text-green-500 text-sm">
					{"// The text runs across..."} <br />
					{'<html lang="en">'} <br />
					{"<body>"}
				</div>
				{/* Tu peux mettre une image de fond ici si tu préfères */}
			</div>

			{/* La Carte Principale */}
			<div className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
				{/* Partie GAUCHE : Témoignage & Branding */}
				<div className="md:w-1/2 p-12 flex flex-col justify-between bg-zinc-900/50 border-r border-white/5">
					<div>
						<h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
							Novatio
						</h1>
					</div>

					<div className="mt-12 md:mt-0">
						<div className="flex gap-1 mb-4 text-yellow-400">
							{[1, 2, 3, 4, 5].map((i) => (
								<Star key={i} size={16} fill="currentColor" />
							))}
						</div>
						<p className="text-lg font-medium italic mb-4 text-gray-200">
							"La meilleure plateforme pour apprendre le code
							sérieusement. J'ai trouvé un job en 3 mois."
						</p>
						<p className="text-sm text-gray-500 font-bold uppercase tracking-wide">
							— Thomas D., Développeur Front-End
						</p>
					</div>
				</div>

				{/* Partie DROITE : Le Formulaire (Variable) */}
				<div className="md:w-1/2 p-12 flex flex-col justify-center bg-black/80">
					<div className="max-w-md mx-auto w-full">
						<h2 className="text-3xl font-bold mb-2">{title}</h2>
						<p className="text-gray-400 mb-8">{subtitle}</p>

						{/* C'est ici qu'on injecte le formulaire spécifique (Login ou Signup) */}
						{children}

						{/* Lien bas de page (ex: "Déjà un compte ?") */}
						<div className="mt-6 text-center text-sm text-gray-500">
							{footerText}{" "}
							<a
								href="#"
								className="text-purple-400 hover:text-purple-300 font-medium"
							>
								{footerLink}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connexion;
