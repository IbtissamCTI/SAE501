import { useState } from "react";
import { 
    Check, 
    Code, 
    UsersRound, 
    BriefcaseBusiness, 
    ChevronDown, 
    Send, 
    Star 
} from "lucide-react";

function Acceuil() {
    const [questionOuverte, setQuestionOuverte] = useState(null);

    const gererClickFAQ = (index) => {
        if (questionOuverte === index) {
            setQuestionOuverte(null);
        } else {
            setQuestionOuverte(index);
        }
    };

    const entreprisesBase = [
        { nom: "Apple", couleur: "bg-zinc-300" },
        { nom: "Google", couleur: "bg-red-500" },
        { nom: "Uber", couleur: "bg-white" },
        { nom: "Discord", couleur: "bg-[#5865F2]" },
        { nom: "Spotify", couleur: "bg-[#1DB954]" },
    ];
    
    const listeEntreprises = [...entreprisesBase, ...entreprisesBase, ...entreprisesBase];

    const listeQuestions = [
        {
            titre: "Faut-il des pré-requis pour s'inscrire ?",
            reponse: "Non, aucun diplôme ni compétence technique préalable n'est requis. Nous recherchons avant tout de la motivation, de la logique et une grande envie d'apprendre.",
        },
        {
            titre: "La formation est-elle reconnue ?",
            reponse: "Oui, notre formation délivre un titre RNCP de niveau 6 (équivalent Bac+3/4) reconnu par l'État et très apprécié des entreprises du secteur tech.",
        },
        {
            titre: "Puis-je financer avec mon CPF ?",
            reponse: "Absolument. La formation est éligible au CPF, Pôle Emploi et autres dispositifs de financement. Notre équipe vous accompagne pour monter votre dossier.",
        },
        {
            titre: "Comment se passe l'alternance ?",
            reponse: "L'alternance commence après la période de bootcamp intensif. Vous êtes 3 semaines en entreprise et 1 semaine en formation, avec un salaire mensuel.",
        },
    ];

    const temoignages = [
        {
            prenom: "Thomas L.",
            poste: "Dev Frontend @ Canal+",
            message: "Je partais de zéro. En 6 mois, j'ai appris plus qu'en 2 ans d'auto-formation. Le mentorat fait toute la différence quand on est bloqué.",
            couleurTexte: "text-purple-400",
            bordure: "hover:border-purple-500",
            ombre: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
            initiales: "TL"
        },
        {
            prenom: "Sarah Benali",
            poste: "Product Designer @ Lydia",
            message: "L'approche par projet est géniale. J'ai pu construire un portfolio solide qui a impressionné les recruteurs dès mon premier entretien.",
            couleurTexte: "text-cyan-400",
            bordure: "hover:border-cyan-500",
            ombre: "hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
            initiales: "SB"
        },
        {
            prenom: "Karim D.",
            poste: "Freelance React Native",
            message: "Le module sur le freelancing et la garantie emploi ne sont pas du vent. J'ai signé mon premier contrat 2 semaines après la fin du bootcamp.",
            couleurTexte: "text-emerald-400",
            bordure: "hover:border-emerald-500",
            ombre: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
            initiales: "KD"
        }
    ];

    return (
        <>
            <section
                id="home"
                className="p-40 w-auto h-auto flex flex-col justify-center items-center text-center px-4 relative overflow-hidden"
            >
                <div
                    className="inline-block px-9 py-1 rounded-full border-4 text-lg mb-6 bg-opacity-40 font-semibold"
                    style={{
                        backgroundColor: "#431EA7",
                        borderColor: "#2F008D",
                        color: "#8D83E0",
                    }}
                >
                    NOUVELLE RENTRÉE OCTOBRE 2026
                </div>

                <div>
                    <h1 className="mt-14 font-bold text-8xl text-white">
                        L'Excellence du Code{" "}
                        <span
                            style={{
                                background: "linear-gradient(90deg, rgba(38, 28, 202, 1) 0%, rgba(88, 80, 220, 1) 50%, rgba(168, 124, 243, 1) 100%)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            Accessible à Tous.
                        </span>
                    </h1>
                    <p className="mt-8 text-2xl text-gray-300 leading-loose max-w-5xl mx-auto" style={{ color: "#999999" }}>
                        Ne vous contentez pas d'apprendre la syntaxe. Devenez un ingénieur logiciel complet grâce à notre pédagogie par projet et notre mentorat d'élite.
                    </p>
                </div>

                <div className="flex gap-8 justify-center">
                    <button
                        className="mt-10 text-white px-8 py-4 rounded-2xl transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold text-lg"
                        style={{
                            background: "linear-gradient(90deg, rgba(38, 28, 202, 1) 0%, rgba(88, 80, 220, 1) 70%, rgba(168, 124, 243, 1) 100%)",
                            color: "white",
                        }}
                    >
                        Explore les formations
                    </button>

                    <button className="mt-10 bg-white border-2 border-indigo-600 px-8 py-4 rounded-2xl transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold text-lg text-[#6057ED]">
                        Voir la Salle
                    </button>
                </div>
            </section>

            <section className="py-10 bg-[#0A0A0C] overflow-hidden">
                <h2 className="text-center text-gray-400 text-sm font-bold uppercase tracking-wider mb-8">
                    NOS ALUMNI TRAVAILLENT CHEZ
                </h2>

                <div className="relative w-full overflow-hidden bg-[#0A0A0C]">
                    <div className="absolute left-0 top-0 z-[2] h-full w-[100px] bg-gradient-to-r from-[#0A0A0C] to-transparent"></div>
                    <div className="absolute right-0 top-0 z-[2] h-full w-[100px] bg-gradient-to-l from-[#0A0A0C] to-transparent"></div>

                    <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
                        <div className="flex items-center gap-16 mx-8">
                            {listeEntreprises.map((entreprise, index) => (
                                <div key={index} className="flex items-center gap-3 font-bold text-gray-300 text-xl">
                                    <span>{entreprise.nom}</span>
                                    <div className={`w-4 h-4 rounded-full ${entreprise.couleur}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="px-5 py-20 w-full flex flex-col items-center">
                <h1 className="text-white text-6xl my-10 font-bold text-center">
                    Pourquoi Novatio est different ?
                </h1>
                <p className="text-gray-400 mb-10 text-xl text-center max-w-3xl">
                    Notre approche unique combine mentorat d'élite, apprentissage par projets et une pédagogie adaptée à vos besoins.
                </p>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group relative bg-[#0A0A0C] border-2 border-white/5 p-10 rounded-3xl min-h-[380px] flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-purple-500 hover:shadow-[0_0_40px_5px_rgba(168,85,247,0.5)]">
                        <div className="w-16 h-16 mb-8 rounded-2xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-500">
                            <Code size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-500">
                            Apprentissage par Projets
                        </h3>
                        <p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                            Codez des applications réelles (Netflix clone, API E-commerce, SaaS) que vous pourrez mettre dans votre portfolio.
                        </p>
                    </div>

                    <div className="group relative bg-[#0A0A0C] border-2 border-white/5 p-10 rounded-3xl min-h-[380px] flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-[0_0_40px_5px_rgba(6,182,212,0.5)]">
                        <div className="w-16 h-16 mb-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-500">
                            <UsersRound size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-500">
                            Mentorat Illimité
                        </h3>
                        <p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                            Ne restez jamais bloqué. Nos mentors seniors sont disponibles 7j/7 pour de la Code Review et du Pair Programming.
                        </p>
                    </div>

                    <div className="group relative bg-[#0A0A0C] border-2 border-white/5 p-10 rounded-3xl min-h-[380px] flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500 hover:shadow-[0_0_40px_5px_rgba(16,185,129,0.5)]">
                        <div className="w-16 h-16 mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-500">
                            <BriefcaseBusiness size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-500">
                            Garantie Emploi
                        </h3>
                        <p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                            Nous vous coachons jusqu'à la signature de votre CDI. Simulation d'entretiens techniques et optimisation CV.
                        </p>
                    </div>
                </div>
            </section>

            <section id="about" className="px-5 py-20 w-full flex flex-col items-center">
                <h1 className="text-white text-6xl my-10 font-bold text-center">
                    Investissez dans votre Avenir
                </h1>
                <p className="text-gray-400 mb-10 text-xl text-center max-w-3xl">
                    Des formules transparentes, sans coûts cachés.<br />Eligible CPF et OPCO
                </p>

                <div className="mt-20 w-full max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        
                        <div className="border border-white/10 bg-zinc-900/30 p-8 rounded-3xl flex flex-col h-full text-white">
                            <h3 className="text-xl font-bold">Autonomie</h3>
                            <div className="text-4xl font-extrabold mt-4 mb-2">490 €</div>
                            <p className="text-sm text-gray-400 mb-6">Paiement en plusieurs fois</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check color="#4F46E5" /> Accès illimité aux cours</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check color="#4F46E5" /> Communauté Discord</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check color="#4F46E5" /> Soutien Codeurs</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold">Choisir</button>
                        </div>

                        <div className="relative bg-white text-black p-8 rounded-3xl flex flex-col shadow-2xl shadow-purple-900/20 transform md:scale-110 z-10">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-5 py-3 rounded-xl uppercase tracking-wide" 
                                 style={{ background: "linear-gradient(90deg, rgba(38, 28, 202, 1) 0%, rgba(88, 80, 220, 1) 70%, rgba(168, 124, 243, 1) 100%)" }}>
                                Le + populaire
                            </div>
                            <h3 className="text-xl font-bold mt-2">Bootcamp intensif</h3>
                            <div className="text-4xl font-extrabold mt-4 mb-2">1490 €</div>
                            <p className="text-sm text-gray-600 mb-6">Payable en 3x ou 4x sans frais</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm font-medium"><Check color="#4F46E5" /> Tuteur dédié (mentor)</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><Check color="#4F46E5" /> Projets réels & Code Review</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><Check color="#4F46E5" /> Career Coaching</li>
                                <li className="flex items-center gap-3 text-sm font-medium"><Check color="#4F46E5" /> Garantie Emploi</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition font-bold">Je démarre</button>
                        </div>

                        <div className="border border-white/10 bg-zinc-900/30 p-8 rounded-3xl flex flex-col h-full text-white">
                            <h3 className="text-xl font-bold">Alternance</h3>
                            <div className="text-4xl font-extrabold mt-4 mb-2">0 €</div>
                            <p className="text-sm text-gray-400 mb-6">100% financé par l'entreprise</p>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check color="#4F46E5" /> Formation en 12 mois</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check color="#4F46E5" /> Salaire mensuel</li>
                                <li className="flex items-center gap-3 text-sm text-gray-300"><Check color="#4F46E5" /> Diplôme reconnu</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold">Candidater</button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="max-w-7xl mx-auto px-5 py-20 w-full">
                <h1 className="text-6xl text-center mt-10 font-bold text-white mb-4">
                    Ce que disent nos étudiants
                </h1>
                <p className="text-gray-400 mb-16 text-xl text-center max-w-3xl mx-auto">
                    Ils ont transformé leur carrière. Voici leurs histoires.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {temoignages.map((avis, i) => (
                        <div 
                            key={i} 
                            className={`group bg-[#0A0A0C] border border-white/10 p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${avis.bordure} ${avis.ombre}`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-white/5 ${avis.couleurTexte} border border-white/10`}>
                                    {avis.initiales}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg leading-none mb-1">{avis.prenom}</h4>
                                    <p className={`text-sm ${avis.couleurTexte}`}>{avis.poste}</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-1 mb-4">
                                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                            </div>

                            <p className="text-gray-400 leading-relaxed italic">"{avis.message}"</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-5 py-20 w-full">
                <h1 className="text-6xl text-center mt-20 font-bold text-white mb-10">
                    Questions Fréquentes
                </h1>
                
                <div className="space-y-4 pt-10">
                    {listeQuestions.map((q, index) => (
                        <div key={index} className="border-b border-white/10 last:border-none">
                            <button
                                onClick={() => gererClickFAQ(index)}
                                className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
                            >
                                <span className="text-lg font-medium text-white group-hover:text-purple-400 transition-colors">
                                    {q.titre}
                                </span>
                                <span className={`transform transition-transform duration-300 ${questionOuverte === index ? "rotate-180" : ""}`}>
                                    <ChevronDown color="#ffffff" />
                                </span>
                            </button>
                            
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${questionOuverte === index ? "max-h-40 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
                                <p className="text-gray-400 leading-relaxed">{q.reponse}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section 
                id="contact" 
                className="max-w-7xl mx-auto rounded-3xl bg-[#4F46E5] py-20 px-10 mb-20 text-center relative overflow-hidden"
            >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
                    Prêt à lancer votre carrière ?
                </h1>
                <p className="text-white text-xl leading-relaxed mb-12">
                    Rejoignez plus de 5000 étudiants qui ont transformé leur avenir avec Novatio.
                    <br /> Inscriptions ouvertes pour Octobre.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
                    <input
                        className="w-full md:w-2/3 h-14 px-6 rounded-xl border-2 border-transparent focus:border-white/30 focus:outline-none bg-white/10 text-white placeholder-gray-300 transition-all"
                        type="email"
                        placeholder="Votre adresse email"
                    />
                    <button className="w-full md:w-auto h-14 px-8 bg-white text-[#4F46E5] rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-purple-900/20">
                        S'inscrire
                        <Send size={20} className="text-[#4F46E5]" />
                    </button>
                </div>

                <p className="text-[#B3B3B3] text-sm mt-8">
                    Pas de spam. Désabonnement à tout moment en un clic.
                </p>
            </section>
        </>
    );
}
//ejsdfmkleùqls

export default Acceuil;