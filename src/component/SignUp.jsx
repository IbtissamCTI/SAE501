import React from "react";
import { Mail, Lock, Star, Github, Chrome } from "lucide-react";

// --- COMPOSANTS PARTAGÉS (Inclus ici pour la compilation) ---

const SocialButtons = () => (
	<div className="grid grid-cols-2 gap-3">
		<button
			type="button"
			className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm font-medium transition-all text-white hover:border-zinc-700"
		>
			<Github size={18} />
			GitHub
		</button>
		<button
			type="button"
			className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm font-medium transition-all text-white hover:border-zinc-700"
		>
			<Chrome size={18} className="text-white" />
			Google
		</button>
	</div>
);

const Divider = ({ text }) => (
	<div className="relative flex py-2 items-center">
		<div className="flex-grow border-t border-zinc-800"></div>
		<span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase font-medium tracking-wide">
			{text}
		</span>
		<div className="flex-grow border-t border-zinc-800"></div>
	</div>
);

// --- LAYOUT COMMUN ---

const AuthLayout = ({
	title,
	subtitle,
	children,
	footerText,
	footerActionText,
	onSwitch,
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
							<button
								onClick={onSwitch}
								className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors underline decoration-transparent hover:decoration-indigo-300 ml-1"
							>
								{footerActionText}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// --- COMPOSANT PRINCIPAL : SIGNUP ---

const SignUp = ({ onSwitch }) => {
	return (
		<AuthLayout
			title="Créer un compte"
			subtitle="Rejoignez la communauté et accédez aux cours gratuits."
			footerText="Vous avez déjà un compte ?"
			footerActionText="Se connecter"
			onSwitch={onSwitch}
		>
			<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
				<SocialButtons />
				<Divider text="Ou s'inscrire avec" />

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-1.5">
						<label className="text-xs font-medium text-gray-400 ml-1">
							Prénom
						</label>
						<input
							type="text"
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="John"
						/>
					</div>
					<div className="space-y-1.5">
						<label className="text-xs font-medium text-gray-400 ml-1">
							Nom
						</label>
						<input
							type="text"
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="Doe"
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
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="john@exemple.com"
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
							className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all text-sm"
							placeholder="••••••••••••"
						/>
					</div>
					<p className="text-[10px] text-gray-500 ml-1">
						Min. 8 caractères
					</p>
				</div>

				<button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.7)] mt-2">
					Commencer l'aventure
				</button>
			</form>
		</AuthLayout>
	);
};

export default SignUp;
