import React, { useState, useRef, useEffect } from "react";
import {
	Atom,
	Server,
	Layers,
	BarChart,
	Cloud,
	Database,
	LayoutTemplate,
	Coffee,
	FileCode,
	Container,
	CloudLightning,
	CheckCircle,
	Circle,
	Lock,
	Calendar,
	ChevronRight,
} from "lucide-react";

// --- DONNÉES ---
const CATEGORIES = [
	{
		id: "front",
		label: "Front-End",
		sub: "Interfaces & UX",
		icon: LayoutTemplate,
		color: "text-blue-400",
		bg: "bg-blue-500/20",
	},
	{
		id: "back",
		label: "Back-End",
		sub: "Logique & Data",
		icon: Server,
		color: "text-green-400",
		bg: "bg-green-500/20",
	},
	{
		id: "fullstack",
		label: "Fullstack",
		sub: "360°",
		icon: Layers,
		color: "text-purple-400",
		bg: "bg-purple-500/20",
	},
	{
		id: "data",
		label: "Data & IA",
		sub: "Analyse & ML",
		icon: BarChart,
		color: "text-yellow-400",
		bg: "bg-yellow-500/20",
	},
	{
		id: "devops",
		label: "DevOps",
		sub: "Cloud & Infra",
		icon: Cloud,
		color: "text-red-400",
		bg: "bg-red-500/20",
	},
];

const COURSES_DATA = {
	front: [
		{
			id: "react",
			name: "React.js",
			icon: Atom,
			color: "text-blue-400",
			desc: "Maîtrisez la bibliothèque N°1. Hooks, Context API et Redux.",
		},
		{
			id: "vue",
			name: "Vue.js",
			icon: LayoutTemplate,
			color: "text-green-400",
			desc: "Le framework progressif. Composition API et performance.",
		},
		{
			id: "angular",
			name: "Angular",
			icon: Layers,
			color: "text-red-500",
			desc: "Le framework complet. TypeScript et RxJS pour l'entreprise.",
		},
		{
			id: "next",
			name: "Next.js",
			icon: Server,
			color: "text-white",
			desc: "React en production. SSR et SEO natif.",
		},
	],
	back: [
		{
			id: "node",
			name: "Node.js",
			icon: Server,
			color: "text-green-500",
			desc: "JS côté serveur. API REST rapides avec Express.",
		},
		{
			id: "python",
			name: "Python",
			icon: FileCode,
			color: "text-yellow-300",
			desc: "Polyvalent. Django/Flask pour le web, scripts.",
		},
		{
			id: "java",
			name: "Java / Spring",
			icon: Coffee,
			color: "text-red-400",
			desc: "Standard industriel. Microservices robustes.",
		},
	],
	fullstack: [
		{
			id: "mern",
			name: "Stack MERN",
			icon: Layers,
			color: "text-blue-300",
			desc: "MongoDB, Express, React, Node. Autonomie totale.",
		},
		{
			id: "next-full",
			name: "Next.js Full",
			icon: Atom,
			color: "text-white",
			desc: "App complète, API et Front avec un seul framework.",
		},
	],
	data: [
		{
			id: "sql",
			name: "SQL Expert",
			icon: Database,
			color: "text-gray-300",
			desc: "Bases relationnelles et requêtes complexes.",
		},
		{
			id: "python-data",
			name: "Python Data",
			icon: BarChart,
			color: "text-yellow-300",
			desc: "Pandas, NumPy. Analyse de données brutes.",
		},
	],
	devops: [
		{
			id: "docker",
			name: "Docker",
			icon: Container,
			color: "text-blue-500",
			desc: "Conteneurisation pour déploiement fluide.",
		},
		{
			id: "aws",
			name: "AWS Cloud",
			icon: CloudLightning,
			color: "text-orange-400",
			desc: "Cloud leader. EC2, S3 et Serverless.",
		},
	],
};

const SESSIONS_MOCK = [
	{ id: 1, date: "10 Oct - 15 Oct", slot: "Complet", full: true },
	{ id: 2, date: "24 Oct - 29 Oct", slot: "3 places restantes", full: false },
	{ id: 3, date: "07 Nov - 12 Nov", slot: "8 places restantes", full: false },
];

export default function Formation() {
	const [activeCategory, setActiveCategory] = useState("front");
	const [selectedTech, setSelectedTech] = useState(null);
	const [selectedSession, setSelectedSession] = useState(null);
	const [isPaying, setIsPaying] = useState(false);

	// Références pour le scroll automatique
	const techGridRef = useRef(null);
	const detailsRef = useRef(null);

	// Effet : Quand on change de catégorie, on reset la techno et on scroll vers la grille
	useEffect(() => {
		setSelectedTech(null);
	}, [activeCategory]);

	// Effet : Scroll vers les détails quand une techno est choisie
	useEffect(() => {
		if (selectedTech && detailsRef.current) {
			setTimeout(() => {
				detailsRef.current.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}, 100);
		}
	}, [selectedTech]);

	const handlePayment = () => {
		setIsPaying(true);
		setTimeout(() => {
			alert("Redirection vers Stripe...");
			setIsPaying(false);
		}, 1500);
	};

	return (
		<div className="min-h-screen bg-[#050505] text-white font-sans pt-40 pb-20 selection:bg-indigo-500/30">
			{/* Style pour masquer la scrollbar */}
			
			{/* --- HERO SECTION --- */}
			<header className="text-center px-20 mb-20">
				<h1 className="mt-14 font-bold text-8xl text-white">
					Trouvez votre voie.{" "}
				</h1>
				<p className="text-gray-400 max-w-2xl mx-auto">
					Sélectionnez votre domaine, choisissez votre techno,
					lancez-vous.
				</p>
			</header>

			{/* --- ÉTAPE 1 : CARROUSEL CATÉGORIES --- */}
			<section className="mb-20">
				<div className="text-center mb-8">
					<span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
						Étape 1
					</span>
					<h2 className="text-2xl font-bold mt-1">
						Quel type de développeur êtes-vous ?
					</h2>
					<p className="text-xs text-gray-500 mt-1">
						Scrollez ou cliquez pour sélectionner
					</p>
				</div>

				{/* Container Scroll Horizontal */}
				<div className="flex overflow-x-auto hide-scrollbar gap-5 px-[10vw] md:justify-center py-10 snap-x mandatory">
					{CATEGORIES.map((cat) => {
						const isActive = activeCategory === cat.id;
						const Icon = cat.icon;

						return (
							<div
								key={cat.id}
								onClick={() => setActiveCategory(cat.id)}
								className={`
                                    snap-center shrink-0 w-[280px] p-8 rounded-2xl cursor-pointer transition-all duration-400 ease-out
                                    flex flex-col items-center text-center
                                    ${
										isActive
											? "bg-indigo-600 border-transparent shadow-[0_0_40px_rgba(79,70,229,0.4)] scale-110 z-10 opacity-100" // Fond violet actif
											: "glass-card scale-90 opacity-60 hover:opacity-100"
									}
                                `}
							>
								<div
									className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl ${
										isActive
											? "bg-white/20 text-white"
											: `${cat.bg} ${cat.color}`
									}`}
								>
									<Icon size={32} />
								</div>
								<h3 className="text-2xl font-bold mb-2">
									{cat.label}
								</h3>
								<p
									className={`text-xs ${
										isActive
											? "text-indigo-200"
											: "text-gray-400"
									}`}
								>
									{cat.sub}
								</p>
							</div>
						);
					})}
				</div>
			</section>

			{/* --- ÉTAPE 2 : GRILLE TECHNOS --- */}
			<section
				ref={techGridRef}
				className="max-w-5xl mx-auto px-4 mb-20 min-h-[300px]"
			>
				<div className="text-center mb-10 animate-in slide-in-from-bottom-4 duration-500">
					<span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
						Étape 2
					</span>
					<h2 className="text-2xl font-bold mt-1">
						Choisissez votre technologie
					</h2>
					<p className="text-gray-400 text-sm mt-2">
						Parcours compatibles avec{" "}
						<span className="text-white font-bold">
							{
								CATEGORIES.find((c) => c.id === activeCategory)
									?.label
							}
						</span>
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{COURSES_DATA[activeCategory]?.map((tech) => {
						const Icon = tech.icon;
						const isSelected = selectedTech?.id === tech.id;

						return (
							<div
								key={tech.id}
								onClick={() => setSelectedTech(tech)}
								className={`
                                    p-6 rounded-xl cursor-pointer flex flex-col items-center gap-3 text-center transition-all duration-300
                                    ${
										isSelected
											? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105 border-transparent" // Fond violet actif
											: "glass-card hover:-translate-y-1 border-white/10"
									}
                                `}
							>
								<div
									className={`mb-2 text-4xl ${
										isSelected ? "text-white" : tech.color
									}`}
								>
									<Icon size={40} />
								</div>
								<h4 className="font-bold text-lg">
									{tech.name}
								</h4>
								<span
									className={`text-[10px] uppercase px-2 py-1 rounded ${
										isSelected
											? "bg-white/20 text-white"
											: "bg-white/10 text-gray-400"
									}`}
								>
									5 Jours
								</span>
							</div>
						);
					})}
				</div>
			</section>

			{/* --- ÉTAPE 3 : DÉTAILS & PAIEMENT --- */}
			{selectedTech && (
				<section
					ref={detailsRef}
					className="max-w-6xl mx-auto px-4 py-12 border-t border-white/10 bg-[#0a0a0a] animate-in slide-in-from-bottom-10 duration-700"
				>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Colonne Gauche : Infos Cours */}
						<div className="lg:col-span-2">
							<div className="flex items-center gap-6 mb-8">
								<div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
									<selectedTech.icon
										size={32}
										className={selectedTech.color}
									/>
								</div>
								<div>
									<h2 className="text-3xl font-bold text-white">
										{selectedTech.name} Intensif
									</h2>
									<span className="text-sm text-gray-400">
										Formation intensive certifiante
									</span>
								</div>
							</div>

							<div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed mb-8">
								<p className="text-lg mb-4">
									{selectedTech.desc}
								</p>
								<ul className="space-y-3 pl-0">
									<li className="flex gap-3 items-center">
										<div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
										<span>
											Projets réels encadrés par des
											mentors seniors.
										</span>
									</li>
									<li className="flex gap-3 items-center">
										<div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
										<span>
											Accès à la plateforme Novatio
											pendant 12 mois.
										</span>
									</li>
									<li className="flex gap-3 items-center">
										<div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
										<span>
											Certification de fin de parcours
											reconnue.
										</span>
									</li>
								</ul>
							</div>

							{/* Stats */}
							<div className="grid grid-cols-3 gap-4">
								<div className="p-4 rounded-lg bg-white/5 text-center">
									<div className="text-2xl font-bold text-white">
										5 Jours
									</div>
									<div className="text-xs text-gray-500">
										Durée
									</div>
								</div>
								<div className="p-4 rounded-lg bg-white/5 text-center">
									<div className="text-2xl font-bold text-white">
										Expert
									</div>
									<div className="text-xs text-gray-500">
										Niveau
									</div>
								</div>
								<div className="p-4 rounded-lg bg-white/5 text-center">
									<div className="text-2xl font-bold text-white">
										1490€
									</div>
									<div className="text-xs text-gray-500">
										CPF Ok
									</div>
								</div>
							</div>
						</div>

						{/* Colonne Droite : Calendrier & Paiement */}
						<div className="lg:col-span-1">
							<div className="glass-card p-6 rounded-xl sticky top-24">
								<h3 className="font-bold text-lg mb-4 flex items-center gap-2">
									Prochaines Sessions
								</h3>
								<p className="text-xs text-gray-400 mb-6">
									Sélectionnez une date (max 10 places)
								</p>

								<div className="space-y-3">
									{SESSIONS_MOCK.map((session) => (
										<div
											key={session.id}
											onClick={() =>
												!session.full &&
												setSelectedSession(session.id)
											}
											className={`
                                                p-3 border rounded-lg flex justify-between items-center transition-all duration-200
                                                ${
													session.full
														? "opacity-50 cursor-not-allowed border-transparent bg-red-900/10"
														: "cursor-pointer hover:border-white/30 border-white/10"
												}
                                                ${
													selectedSession ===
														session.id &&
													!session.full
														? "bg-indigo-600 border-transparent" // Fond violet actif session
														: ""
												}
                                            `}
										>
											<div>
												<div className="font-bold text-sm text-white">
													{session.date}
												</div>
												<div
													className={`text-xs mt-0.5 ${
														session.full
															? "text-red-400"
															: selectedSession ===
															  session.id
															? "text-indigo-200"
															: "text-green-400"
													}`}
												>
													{session.slot}
												</div>
											</div>
											{session.full ? (
												<span className="text-[10px] font-bold text-red-500">
													Complet
												</span>
											) : selectedSession ===
											  session.id ? (
												<CheckCircle
													className="text-white"
													size={18}
												/>
											) : (
												<Circle
													className="text-gray-600"
													size={18}
												/>
											)}
										</div>
									))}
								</div>

								{/* Zone Paiement */}
								{selectedSession && (
									<div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
										<div className="flex justify-between items-center mb-4">
											<span className="text-sm text-gray-400">
												Total à payer
											</span>
											<span className="text-xl font-bold text-white">
												1490 €
											</span>
										</div>
										<button
											onClick={handlePayment}
											disabled={isPaying}
											className="w-full py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-lg shadow-white/10 flex justify-center items-center gap-2"
										>
											{isPaying ? (
												"Traitement..."
											) : (
												<>
													<Lock size={14} /> Passer au
													paiement
												</>
											)}
										</button>
										<p className="text-[10px] text-gray-500 text-center mt-2">
											Paiement sécurisé via Stripe
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
