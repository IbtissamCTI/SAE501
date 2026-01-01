import { Check } from "lucide-react";
import { Code, UsersRound, BriefcaseBusiness, ChevronDown, Send} from "lucide-react";
import { useState } from "react";

function acceuil() {
	// On gère l'état de l'accordéon ici (null = tout fermé au début)
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	// Les données de la FAQ (textes à modifier ici)
	const faqs = [
		{
			question: "Faut-il des pré-requis pour s'inscrire ?",
			answer: "Non, aucun diplôme ni compétence technique préalable n'est requis. Nous recherchons avant tout de la motivation, de la logique et une grande envie d'apprendre.",
		},
		{
			question: "La formation est-elle reconnue ?",
			answer: "Oui, notre formation délivre un titre RNCP de niveau 6 (équivalent Bac+3/4) reconnu par l'État et très apprécié des entreprises du secteur tech.",
		},
		{
			question: "Puis-je financer avec mon CPF ?",
			answer: "Absolument. La formation est éligible au CPF, Pôle Emploi et autres dispositifs de financement. Notre équipe vous accompagne pour monter votre dossier.",
		},
		{
			question: "Comment se passe l'alternance ?",
			answer: "L'alternance commence après la période de bootcamp intensif. Vous êtes 3 semaines en entreprise et 1 semaine en formation, avec un salaire mensuel.",
		},
	];
	return (
		<>
			<section className="p-40 w-auto h-auto flex flex-col justify-center items-center text-center px-4 relative overflow-hidden ">
				<div
					className={`inline-block px-9 py-1 rounded-full border-4 text-lg mb-6 bg-opacity-40 font-semibold text-2xl`}
					style={{
						backgroundColor: "#431EA7",
						borderColor: "#2F008D",
						color: "#8D83E0",
					}}
				>
					NOUVELLE RENTRE OCTOBRE 2026
				</div>
				<div>
					<h1 className="mt-14  font-bold text-8xl font-bold text-white">
						L'Excellence du Code{" "}
						<span
							style={{
								background:
									"linear-gradient(90deg, rgba(38, 28, 202, 1) 0%, rgba(88, 80, 220, 1) 50%, rgba(168, 124, 243, 1) 100%)",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}
						>
							Accessible à Tous.
						</span>
					</h1>
					<p
						className="mt-8 text-3xl text-gray-300 leading-loose "
						style={{
							color: "#999999",
						}}
					>
						Ne vous contentez pas d'apprendre la syntaxe. Devenez un
						ingénieur logiciel complet grâce à notre pédagogie par
						projet et notre mentorat d'élite.
					</p>
				</div>

				<div className="flex gap-8 justify-center">
					<button
						className="mt-10 text-white px-8 py-4 rounded-2xl transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold text-lg"
						style={{
							background:
								"linear-gradient(90deg, rgba(38, 28, 202, 1) 0%, rgba(88, 80, 220, 1) 70%, rgba(168, 124, 243, 1) 100%)",
							color: "white",
						}}
					>
						Explore les formations
					</button>
					<button
						className="mt-10 bg-white border-2 border-indigo-600  px-8 py-4 rounded-2xl transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold text-lg text-[#6057ED]"
					>
						Voir la Salle
					</button>
				</div>
			</section>
			<section className="" style={{ backgroundColor: "#111113" }}>
				<div className="flex justify-center items-center border-t border-b border-purple-800 py-10 flex-col">
					<h2
						className="my-5 text-white text-lg font-bold"
						style={{ color: "#ABAAB9" }}
					>
						NOS ALUMNI TRAVAILLENT CHEZ
					</h2>
					<div className="bg scroll mx-10 my-5 overflow-x-hidden whitespace-nowrap scrollbar-hide">
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
					</div>
				</div>
			</section>
			<section className="inline justify-between px-5 py-20  w-full flex flex-col items-center">
				<h1 className="text-white text-6xl my-10 font-bold text-center ">
					Pourquoi Novatio est different ?
				</h1>
				<p className="text-gray-400 mb-10 text-xl text-center max-w-3xl">
					Notre approche unique combine mentorat d'élite,
					apprentissage par projets et une pédagogie adaptée à vos
					besoins.
				</p>

				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="group relative bg-zinc-900/40 border border-white/10 p-10 rounded-2xl min-h-[380px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900/80 hover:border-purple-500/50 hover:shadow-[-10px_-10px_30px_-5px_rgba(168,85,247,0.3)]">
						<div className="w-14 h-14 mb-8 rounded-xl border border-purple-500/20 bg-purple-900/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
							<Code color="#9929bd" />
						</div>

						<h3 className="text-2xl font-bold mb-6 text-white group-hover:text-purple-400 transition-colors">
							Apprentissage par Projets
						</h3>
						<p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-100 transition-colors">
							Codez des applications réelles (Netflix clone, API
							E-commerce, SaaS) que vous pourrez mettre dans votre
							portfolio.
						</p>
					</div>

					<div className="group relative bg-zinc-900/40 border border-white/10 p-10 rounded-2xl min-h-[380px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900/80 hover:border-cyan-500/50 hover:shadow-[-10px_-10px_30px_-5px_rgba(6,182,212,0.3)]">
						<div className="w-14 h-14 mb-8 rounded-xl border border-cyan-500/20 bg-cyan-900/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
							<UsersRound color="#008cb4" />
						</div>

						<h3 className="text-2xl font-bold mb-6 text-white group-hover:text-cyan-400 transition-colors">
							Mentorat Illimité
						</h3>
						<p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-100 transition-colors">
							Description : Ne restez jamais bloqué. Nos mentors
							seniors sont disponibles 7j/7 pour de la Code Review
							et du Pair Programming.
						</p>
					</div>

					<div className="group relative bg-zinc-900/40 border border-white/10 p-10 rounded-2xl min-h-[380px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900/80 hover:border-pink-500/50 hover:shadow-[-10px_-10px_30px_-5px_rgba(236,72,153,0.3)]">
						<div className="w-14 h-14 mb-8 rounded-xl border border-pink-500/20 bg-pink-900/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/20 group-hover:scale-110 transition-all duration-300">
							<BriefcaseBusiness color="#b92d5d" />
						</div>

						<h3 className="text-2xl font-bold mb-6 text-white group-hover:text-pink-400 transition-colors">
							Garantie Emploi
						</h3>
						<p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-100 transition-colors">
							Nous vous coachons jusqu'à la signature de votre
							CDI. Simulation d'entretiens techniques et
							optimisation CV.
						</p>
					</div>
				</div>
			</section>

			<section className="inline justify-between px-5 py-20  w-full flex flex-col items-center">
				<h1 className="text-white text-6xl my-10 font-bold text-center ">
					Investissez dans votre Avenir
				</h1>
				<p className="text-gray-400 mb-10 text-xl text-center max-w-3xl">
					Des formules transparentes, sans coûts cachés.<br />Eligible CPF
					et OPCO
				</p>
				<div className="mt-20">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
						<div className="border border-white/10 bg-zinc-900/30 p-8 rounded-3xl flex flex-col h-full text-white">
							<h3 className="text-xl font-bold">Autonomie</h3>
							<div className="text-4xl font-extrabold mt-4 mb-2">
								490 €
							</div>
							<p className="text-sm text-gray-400 mb-6">
								Paiement en plusieurs fois
							</p>

							<ul className="space-y-4 mb-8 flex-1">
								<li className="flex items-center gap-3 text-sm text-gray-300">
									<Check color="#4F46E5" /> Accès illimité aux
									cours
								</li>
								<li className="flex items-center gap-3 text-sm text-gray-300">
									<Check color="#4F46E5" /> Communauté Discord
								</li>
								<li className="flex items-center gap-3 text-sm text-gray-300">
									<Check color="#4F46E5" /> Soutien Codeurs
								</li>
							</ul>

							<button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold">
								Choisir
							</button>
						</div>

						<div className="relative bg-white text-black p-8 rounded-3xl flex flex-col shadow-2xl shadow-purple-900/20 transform md:scale-110 z-10">
							{/* Badge en haut */}
							<div
								className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-5 py-3 rounded-xl uppercase tracking-wide"
								style={{
									background:
										"linear-gradient(90deg, rgba(38, 28, 202, 1) 0%, rgba(88, 80, 220, 1) 70%, rgba(168, 124, 243, 1) 100%)",
									color: "white",
								}}
							>
								Le + populaire
							</div>

							<h3 className="text-xl font-bold mt-2">
								Bootcamp intensif
							</h3>
							<div className="text-4xl font-extrabold mt-4 mb-2">
								1490 €
							</div>
							<p className="text-sm text-gray-600 mb-6">
								Payable en 3x ou 4x sans frais
							</p>

							<ul className="space-y-4 mb-8 flex-1">
								<li className="flex items-center gap-3 text-sm font-medium">
									<Check color="#4F46E5" /> Tuteur dédié
									(mentor)
								</li>
								<li className="flex items-center gap-3 text-sm font-medium">
									<Check color="#4F46E5" /> Projets réels &
									Code Review
								</li>
								<li className="flex items-center gap-3 text-sm font-medium">
									<Check color="#4F46E5" /> Career Coaching
								</li>
								<li className="flex items-center gap-3 text-sm font-medium">
									<Check color="#4F46E5" /> Garantie Emploi
								</li>
							</ul>

							<button className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition font-bold">
								Je démarre
							</button>
						</div>

						<div className="border border-white/10 bg-zinc-900/30 p-8 rounded-3xl flex flex-col h-full text-white">
							<h3 className="text-xl font-bold">Alternance</h3>
							<div className="text-4xl font-extrabold mt-4 mb-2">
								0 €
							</div>
							<p className="text-sm text-gray-400 mb-6">
								100% financé par l'entreprise
							</p>

							<ul className="space-y-4 mb-8 flex-1">
								<li className="flex items-center gap-3 text-sm text-gray-300">
									<Check color="#4F46E5" /> Formation en 12
									mois
								</li>
								<li className="flex items-center gap-3 text-sm text-gray-300">
									<Check color="#4F46E5" /> Salaire mensuel
								</li>
								<li className="flex items-center gap-3 text-sm text-gray-300">
									<Check color="#4F46E5" /> Diplôme reconnu
								</li>
							</ul>

							<button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold">
								Candidater
							</button>
						</div>
					</div>
				</div>
			</section>
			<section>
				<h1 className="text-6xl text-center mt-20 font-bold text-white mb-10">
					Ce que disent nos étudiants
				</h1>
				<div>{/* Ajoutez ici les témoignages des étudiants */}</div>
			</section>
			<section className="max-w-7xl mx-auto px-5 py-20 w-full">
				<h1 className="text-6xl text-center mt-20 font-bold text-white mb-10">
					Question Fréquentes
				</h1>
				{/* Liste des questions */}
				<div className="space-y-4 pt-10">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="border-b border-white/10 last:border-none"
						>
							<button
								onClick={() => toggleFAQ(index)}
								className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
							>
								<span className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
									{faq.question}
								</span>

								<span
									className={`transform transition-transform duration-300 ${
										openIndex === index ? "rotate-180" : ""
									}`}
								>
									<ChevronDown color="#ffffff" />
								</span>
							</button>

							<div
								className={`overflow-hidden transition-all duration-300 ease-in-out ${
									openIndex === index
										? "max-h-40 opacity-100 pb-6"
										: "max-h-0 opacity-0"
								}`}
							>
								<p className="text-gray-400 leading-relaxed">
									{faq.answer}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>
			<section className=" rounded-3xl bg-[#4F46E5]  mx-auto  mb-10">
				<h1 className="text-6xl text-center pt-20 font-bold text-white pb-10">
					Prêt à lancer votre carrière ?
				</h1>
				<p className="text-center text-white text-xl pb-40">
					Rejoignez plus de 5000 étudiants qui ont transformé leur
					avenir avec Novatio.
					<br /> Inscriptions ouvertes pour Octobre.
				</p>
				<div className=" flex justify-center ">
					<input
						className="rounded-lg w-1/3 h-20 p-10 pl-4 pr-4"
						type="email"
						name="email"
						id=""
						placeholder="email"
					/>
					<button className="ml-4 bg-white text-black px-6 pt-3 rounded-lg font-bold hover:bg-gray-200 transition text-[#6057ED] justify-center flex items-center gap-2">
						{" "}
						S'incrire<Send color="#6057ED" />{" "}
					</button>
				</div>
				<p className="text-center text-white pt-2 pb-10 text-lg text-[#B3B3B3]">
					Pas de spam.Désabonnement à tout moment.
				</p>
			</section>
			<p className="text-center text-white pt-2 pb-10 text-lg text-[#B3B3B3]">
					Pas de spam.Désabonnement à tout moment.
				</p>
		</>
	);
}

export default acceuil;
