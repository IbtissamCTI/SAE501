import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = ({
	title,
	subtitle,
	children,
	footerText,
	footerActionText,
	footerActionLink,
}) => {
	return (
		<div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
			{/* Fond Décoratif */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
			<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

			{/* Carte Principale */}
			<div className="bg-[#0a0a0a] border border-white/10 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[600px]">
				{/* Partie GAUCHE : Témoignage (Fixe) */}
				<div className="hidden md:flex md:w-1/2 p-12 flex-col justify-between bg-zinc-900/50 border-r border-white/5 relative">
					<div className="z-10">
						<h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
							<div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-mono font-bold text-lg">
								N
							</div>
							Novatio.
						</h1>
					</div>

					<div className="z-10 relative">
						<div className="absolute -top-10 -left-4 text-6xl text-indigo-500/20 font-serif">
							"
						</div>
						<div className="flex gap-1 mb-6 text-yellow-400">
							{[1, 2, 3, 4, 5].map((i) => (
								<Star
									key={i}
									size={18}
									fill="currentColor"
									className="text-yellow-400"
								/>
							))}
						</div>
						<p className="text-xl font-medium leading-relaxed text-gray-200 mb-6">
							J'étais perdu dans les tutos YouTube. Novatio m'a
							donné la structure et le mentorat qu'il me fallait.
							J'ai signé mon CDI 2 semaines après la fin du
							bootcamp.
						</p>
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-white/20">
								<img
									src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
									alt="User"
								/>
							</div>
							<div>
								<p className="text-sm font-bold text-white">
									Thomas Durand
								</p>
								<p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
									Développeur Front-End @ Qonto
								</p>
							</div>
						</div>
					</div>

					<div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>
				</div>

				{/* Partie DROITE : Contenu Variable */}
				<div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/80">
					<div className="max-w-sm mx-auto w-full transition-all duration-500 ease-in-out">
						<h2 className="text-3xl font-bold mb-2 text-white">
							{title}
						</h2>
						<p className="text-gray-400 mb-8 text-sm">{subtitle}</p>

						{children}

						<div className="mt-8 text-center text-sm text-gray-500">
							{footerText}{" "}
							<Link
								to={footerActionLink}
								className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors underline decoration-transparent hover:decoration-indigo-300 ml-1"
							>
								{footerActionText}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
