import React, { useState, useRef, useEffect } from "react";
import {
    Atom, Server, Layers, BarChart, Cloud, Database, LayoutTemplate,
    Coffee, FileCode, Container, CloudLightning, CheckCircle,
    Circle, Lock, Calendar, ChevronRight, MapPin, Clock
} from "lucide-react";
import { getFormationsByCategorie, getFormationDetails, startStripePayment, getCurrentUser } from "../data/authService";

// --- STYLES POUR LE DESIGN (On lie les noms du Back aux icônes) ---
const CATEGORIES_STYLES = {
    "Front-End": { icon: LayoutTemplate, color: "text-blue-400", bg: "bg-blue-500/20", sub: "Interfaces & UX" },
    "Back-End": { icon: Server, color: "text-green-400", bg: "bg-green-500/20", sub: "Logique & Data" },
    "Fullstack": { icon: Layers, color: "text-purple-400", bg: "bg-purple-500/20", sub: "360° Architecture" },
    "Data & IA": { icon: BarChart, color: "text-yellow-400", bg: "bg-yellow-500/20", sub: "Analyse & ML" },
    "DevOps": { icon: Cloud, color: "text-red-400", bg: "bg-red-500/20", sub: "Cloud & Infra" },
    "Default": { icon: Atom, color: "text-gray-400", bg: "bg-gray-500/20", sub: "Formation Technique" }
};

export default function Formation() {
    // --- ÉTATS ---
    const [backendFormations, setBackendFormations] = useState([]);
    const [backendSessions, setBackendSessions] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedTech, setSelectedTech] = useState(null);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [isPaying, setIsPaying] = useState(false);

    // --- RÉFÉRENCES ---
    const techGridRef = useRef(null);
    const detailsRef = useRef(null);

    // --- CHARGEMENT DES DONNÉES DEPUIS LE BACKEND (Docker) ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                const authData = localStorage.getItem('authData');
                if (!authData) return;

                const headers = {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${authData}`
                };

                // ✅ Appel aux nouveaux endpoints : /api/formations et /api/sessions
                const [formationsRes, sessionsRes] = await Promise.all([
                    fetch("http://localhost:8080/api/formations", { headers }),
                    fetch("http://localhost:8080/api/sessions", { headers })
                ]);

                if (!formationsRes.ok || !sessionsRes.ok) throw new Error("Accès refusé par le serveur");

                const formationsData = await formationsRes.json();
                const sessionsData = await sessionsRes.json();

                setBackendFormations(formationsData);
                setBackendSessions(sessionsData);

                // ✅ Extraction dynamique des catégories uniques du back
                const uniqueCats = [...new Set(formationsData.map(f => f.categorie))];
                setAvailableCategories(uniqueCats);
                if (uniqueCats.length > 0 && !activeCategory) setActiveCategory(uniqueCats[0]);

            } catch (error) {
                console.error("Erreur de liaison Docker:", error.message);
            }
        };
        fetchData();
    }, []);

    // Effet : Scroll vers les détails quand une techno est choisie
    useEffect(() => {
        if (selectedTech && detailsRef.current) {
            setTimeout(() => {
                detailsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);
        }
    }, [selectedTech]);

    // --- FILTRAGE DES DONNÉES ---
    const activeStyle = CATEGORIES_STYLES[activeCategory] || CATEGORIES_STYLES["Default"];
    const filteredFormations = backendFormations.filter(f => f.categorie === activeCategory);
    const filteredSessions = backendSessions.filter(s => s.formation?.id === selectedTech?.id);

    const handlePayment = () => {
        setIsPaying(true);
        setTimeout(() => {
            alert(`Redirection vers paiement sécurisé pour ${selectedTech.titre} (${selectedTech.prix}€)`);
            setIsPaying(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans pt-40 pb-20 selection:bg-indigo-500/30">
            <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

            {/* --- HERO SECTION --- */}
            <header className="text-center px-20 mb-20">
                <h1 className="mt-14 font-bold text-9xl text-white tracking-tighter italic uppercase">Novatio</h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-2xl mt-4">
                    Parcourez notre catalogue et réservez votre session en direct.
                </p>
            </header>

            {/* --- ÉTAPE 1 : CARROUSEL CATÉGORIES DYNAMIQUES --- */}
            <section className="mb-20">
                <div className="text-center mb-8">
                    <span className="text-xl font-bold text-blue-400 uppercase tracking-widest">Étape 1</span>
                    <h2 className="text-4xl font-bold mt-1">Quelle spécialité vous intéresse ?</h2>
                </div>

                <div className="flex overflow-x-auto hide-scrollbar gap-5 px-[10vw] md:justify-center py-10 snap-x mandatory">
                    {availableCategories.map((catName) => {
                        const style = CATEGORIES_STYLES[catName] || CATEGORIES_STYLES["Default"];
                        const isActive = activeCategory === catName;
                        const Icon = style.icon;

                        return (
                            <div key={catName} onClick={() => { setActiveCategory(catName); setSelectedTech(null); }}
                                className={`snap-center shrink-0 w-[280px] p-8 rounded-2xl cursor-pointer transition-all duration-400
                                ${isActive ? "bg-indigo-600 shadow-[0_0_40px_rgba(79,70,229,0.4)] scale-110 opacity-100" : "glass-card scale-90 opacity-60 hover:opacity-100"}`}>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl ${isActive ? "bg-white/20 text-white" : `${style.bg} ${style.color}`}`}>
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{catName}</h3>
                                <p className={`text-xs ${isActive ? "text-indigo-200" : "text-gray-400"}`}>{style.sub}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* --- ÉTAPE 2 : GRILLE FORMATIONS RÉELLES --- */}
            <section ref={techGridRef} className="max-w-5xl mx-auto px-4 mb-20 min-h-[300px]">
                <div className="text-center mb-10 animate-in slide-in-from-bottom-4 duration-500">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Étape 2</span>
                    <h2 className="text-2xl font-bold mt-1">Choisissez votre technologie</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredFormations.map((tech) => (
                        <div key={tech.id} onClick={() => setSelectedTech(tech)}
                            className={`p-6 rounded-xl cursor-pointer flex flex-col items-center gap-3 text-center transition-all duration-300
                            ${selectedTech?.id === tech.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105" : "glass-card hover:-translate-y-1 border-white/10"}`}>
                            <div className={`mb-2 text-4xl ${selectedTech?.id === tech.id ? "text-white" : activeStyle.color}`}>
                                <activeStyle.icon size={40} />
                            </div>
                            <h4 className="font-bold text-lg">{tech.titre}</h4>
                            <span className="text-[10px] uppercase bg-white/10 px-2 py-1 rounded text-gray-400">{tech.dureeHeures}h</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- ÉTAPE 3 : DÉTAILS & PAIEMENT --- */}
            {selectedTech && (
                <section ref={detailsRef} className="max-w-6xl mx-auto px-4 py-12 border-t border-white/10 bg-[#0a0a0a] animate-in slide-in-from-bottom-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold mb-6 uppercase italic tracking-tighter">{selectedTech.titre} Intensif</h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">{selectedTech.description}</p>
                            
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 rounded-lg bg-white/5"><div className="text-2xl font-bold">{selectedTech.dureeHeures}h</div><div className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Durée</div></div>
                                <div className="p-4 rounded-lg bg-white/5"><div className="text-2xl font-bold text-indigo-400">{selectedTech.prix}€</div><div className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Tarif</div></div>
                                <div className="p-4 rounded-lg bg-white/5"><div className="text-xl font-bold text-green-400"><CheckCircle size={24} className="mx-auto" /></div><div className="text-xs text-gray-500 uppercase font-bold tracking-tighter">Qualiopi</div></div>
                            </div>
                        </div>

                        {/* COLONNE SESSIONS (LIEUX / SALLES RÉELS) */}
                        <div className="lg:col-span-1">
                            <div className="glass-card p-6 rounded-xl border border-white/5">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2 italic uppercase tracking-tighter">
                                    <Calendar size={18} className="text-indigo-500" /> Prochaines Sessions
                                </h3>

                                <div className="space-y-3">
                                    {filteredSessions.length > 0 ? filteredSessions.map((s) => (
                                        <div key={s.id} onClick={() => setSelectedSessionId(s.id)}
                                            className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedSessionId === s.id ? "bg-indigo-600 border-transparent shadow-lg" : "border-white/10 hover:border-white/30"}`}>
                                            <div className="font-bold text-sm">Du {s.dateDebut} au {s.dateFin}</div>
                                            <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                                                <div className="flex items-center gap-1"><MapPin size={10}/> {s.lieu} - {s.salle}</div>
                                                <div className="flex items-center gap-1"><Clock size={10}/> {s.horaires}</div>
                                            </div>
                                        </div>
                                    )) : <p className="text-xs text-gray-500 italic">Aucune session ouverte pour cette formation.</p>}
                                </div>

                                {selectedSessionId && (
                                    <div className="mt-8 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
                                        <button onClick={handlePayment} className="w-full py-4 rounded-xl bg-white text-black font-black uppercase italic tracking-widest hover:bg-gray-200 transition-all shadow-xl flex justify-center items-center gap-2">
                                            <Lock size={14}/> Payer {selectedTech.prix}€
                                        </button>
                                        <p className="text-[10px] text-gray-500 text-center mt-3">Novatio Security v2.0</p>
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