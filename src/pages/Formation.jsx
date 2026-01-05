import React, { useState, useRef, useEffect } from "react";
import {
    Atom, Server, Layers, BarChart, Cloud, Database, LayoutTemplate, Coffee, 
    FileCode, Container, CloudLightning, CheckCircle, Circle, Lock
} from "lucide-react";
import { getFormationsByCategorie, getFormationDetails, startStripePayment, getCurrentUser } from "../data/authService";

const CATEGORIES = [
    { id: "front", label: "Front-End", sub: "Interfaces & UX", icon: LayoutTemplate, color: "text-blue-400", bg: "bg-blue-500/20" },
    { id: "back", label: "Back-End", sub: "Logique & Data", icon: Server, color: "text-green-400", bg: "bg-green-500/20" },
    { id: "fullstack", label: "Fullstack", sub: "360°", icon: Layers, color: "text-purple-400", bg: "bg-purple-500/20" },
    { id: "data", label: "Data & IA", sub: "Analyse & ML", icon: BarChart, color: "text-yellow-400", bg: "bg-yellow-500/20" },
    { id: "devops", label: "DevOps", sub: "Cloud & Infra", icon: Cloud, color: "text-red-400", bg: "bg-red-500/20" },
];

// Mapping pour conserver tes icônes spécifiques selon le titre en BDD
const ICON_MAP = {
    "React.js": Atom, "Vue.js": LayoutTemplate, "Java / Spring": Coffee,
    "Node.js": Server, "Docker": Container, "AWS Cloud": CloudLightning,
    "SQL Expert": Database, "Stack MERN": Layers
};

export default function Formation() {
    const [activeCategory, setActiveCategory] = useState("front");
    const [courses, setCourses] = useState([]); // Données réelles de la BDD
    const [selectedTech, setSelectedTech] = useState(null); // Détails de la BDD
    const [selectedSession, setSelectedSession] = useState(null);
    const [isPaying, setIsPaying] = useState(false);

    const techGridRef = useRef(null);
    const detailsRef = useRef(null);
	
	useEffect(() => {
    getFormationsByCategorie(activeCategory)
        .then(data => {
            console.log("Formations reçues pour " + activeCategory + " :", data); // <--- AJOUTE ÇA
            setCourses(data);
            setSelectedTech(null);
        })
        .catch(err => console.error("Erreur API:", err));
}, [activeCategory]);

    // Charger les technos par catégorie
    useEffect(() => {
        getFormationsByCategorie(activeCategory)
            .then(data => {
                setCourses(data);
                setSelectedTech(null);
            })
            .catch(err => console.error(err));
    }, [activeCategory]);

    // Charger les détails et sessions au clic
    const handleSelectTech = (id) => {
        getFormationDetails(id).then(data => {
            setSelectedTech(data);
            setSelectedSession(null);
            if (detailsRef.current) {
                setTimeout(() => {
                    detailsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
            }
        });
    };

    const handlePayment = () => {
        const user = getCurrentUser();
        if (!user) {
            alert("Veuillez vous connecter pour vous inscrire.");
            return;
        }
        setIsPaying(true);
        startStripePayment(selectedSession, user.id);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pt-40 pb-20 selection:bg-indigo-500/30">
            {/* --- HERO SECTION --- */}
            <header className="text-center px-20 mb-20">
                <h1 className="mt-14 font-bold text-9xl text-white">Trouvez votre voie.</h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-2xl mt-4">
                    Sélectionnez votre domaine, choisissez votre techno, lancez-vous.
                </p>
            </header>

            {/* --- ÉTAPE 1 : CARROUSEL --- */}
            <section className="mb-20">
                <div className="text-center mb-8">
                    <span className="text-xl font-bold text-blue-400 uppercase tracking-widest">Étape 1</span>
                    <h2 className="text-4xl font-bold mt-1">Quel type de développeur êtes-vous ?</h2>
                </div>
                <div className="flex overflow-x-auto hide-scrollbar gap-5 px-[10vw] md:justify-center py-10 snap-x mandatory">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.id} onClick={() => setActiveCategory(cat.id)}
                            className={`snap-center shrink-0 w-[280px] p-8 rounded-2xl cursor-pointer transition-all duration-400 
                            ${activeCategory === cat.id ? "bg-indigo-600 scale-110 z-10 shadow-[0_0_40px_rgba(79,70,229,0.4)]" : "glass-card scale-90 opacity-60 hover:opacity-100"}`}>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl ${activeCategory === cat.id ? "bg-white/20" : `${cat.bg} ${cat.color}`}`}>
                                <cat.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{cat.label}</h3>
                            <p className={`text-xs ${activeCategory === cat.id ? "text-indigo-200" : "text-gray-400"}`}>{cat.sub}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- ÉTAPE 2 : GRILLE TECHNOS --- */}
            <section ref={techGridRef} className="max-w-5xl mx-auto px-4 mb-20 min-h-[300px]">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Étape 2</span>
                    <h2 className="text-2xl font-bold mt-1">Choisissez votre technologie</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {courses.map((tech) => {
                        const Icon = ICON_MAP[tech.titre] || Layers;
                        const isSelected = selectedTech?.id === tech.id;
                        return (
                            <div key={tech.id} onClick={() => handleSelectTech(tech.id)}
                                className={`p-6 rounded-xl cursor-pointer flex flex-col items-center gap-3 text-center transition-all duration-300
                                ${isSelected ? "bg-indigo-600 text-white scale-105" : "glass-card hover:-translate-y-1 border-white/10"}`}>
                                <Icon size={40} className={isSelected ? "text-white" : "text-indigo-400"} />
                                <h4 className="font-bold text-lg">{tech.titre}</h4>
                                <span className={`text-[10px] uppercase px-2 py-1 rounded ${isSelected ? "bg-white/20" : "bg-white/10 text-gray-400"}`}>
                                    {tech.dureeHeures}h
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* --- ÉTAPE 3 : DÉTAILS --- */}
            {selectedTech && (
                <section ref={detailsRef} className="max-w-6xl mx-auto px-4 py-12 border-t border-white/10 bg-[#0a0a0a] animate-in slide-in-from-bottom-10 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-white mb-8">{selectedTech.titre} Intensif</h2>
                            <p className="text-lg text-gray-300 mb-8">{selectedTech.descriptionCourte}</p>
                            
                            <div className="space-y-6 mb-8">
                                <div className="p-6 rounded-lg bg-white/5">
                                    <h4 className="font-bold text-indigo-400 mb-2">🎯 Objectifs</h4>
                                    <p className="text-sm text-gray-400 whitespace-pre-line">{selectedTech.objectifs}</p>
                                </div>
                                <div className="p-6 rounded-lg bg-white/5">
                                    <h4 className="font-bold text-indigo-400 mb-2">📚 Programme</h4>
                                    <p className="text-sm text-gray-400 whitespace-pre-line">{selectedTech.programme}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-white/5 text-center"><div className="text-2xl font-bold">{selectedTech.dureeHeures}h</div><div className="text-xs text-gray-500">Durée</div></div>
                                <div className="p-4 rounded-lg bg-white/5 text-center"><div className="text-2xl font-bold">{selectedTech.niveau}</div><div className="text-xs text-gray-500">Niveau</div></div>
                                <div className="p-4 rounded-lg bg-white/5 text-center"><div className="text-2xl font-bold">{selectedTech.prix}€</div><div className="text-xs text-gray-500">Prix</div></div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="glass-card p-6 rounded-xl sticky top-24">
                                <h3 className="font-bold text-lg mb-4">Prochaines Sessions</h3>
                                <div className="space-y-3">
                                    {selectedTech.sessions?.length > 0 ? selectedTech.sessions.map((s) => (
                                        <div key={s.id} onClick={() => setSelectedSession(s.id)}
                                            className={`p-3 border rounded-lg flex justify-between items-center cursor-pointer transition-all
                                            ${selectedSession === s.id ? "bg-indigo-600 border-transparent" : "border-white/10 hover:border-white/30"}`}>
                                            <div>
                                                <div className="font-bold text-sm">Le {s.dateDebut}</div>
                                                <div className={`text-xs ${selectedSession === s.id ? "text-indigo-200" : "text-green-400"}`}>{s.lieu}</div>
                                            </div>
                                            {selectedSession === s.id ? <CheckCircle size={18}/> : <Circle size={18}/>}
                                        </div>
                                    )) : <p className="text-xs text-gray-500">Aucune session planifiée.</p>}
                                </div>
                                {selectedSession && (
                                    <div className="mt-6 pt-6 border-t border-white/10">
                                        <button onClick={handlePayment} disabled={isPaying} className="w-full py-3 rounded-lg bg-white text-black font-bold flex justify-center items-center gap-2">
                                            {isPaying ? "Traitement..." : <><Lock size={14} /> S'inscrire</>}
                                        </button>
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