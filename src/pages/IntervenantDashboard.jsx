import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar, Clock, CheckCircle, FileText, User, 
  CreditCard, Save, ChevronLeft, Layout, BookOpen, 
  Users, MapPin, ChevronRight, X, Download, Plus, 
  Grid, List, AlertCircle, Trash2, Briefcase, TrendingUp, Mail, LogOut
} from "lucide-react";

// --- CONFIGURATION API ---
const API_URL = 'http://localhost:8080/api/intervenant';

const getAuthHeaders = () => {
    const authData = localStorage.getItem('authData');
    if (!authData) throw new Error("Non connecté");
    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authData}`
    };
};

const IntervenantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ✅ ÉTATS CONNECTÉS AU BACKEND
  const [infosProf, setInfosProf] = useState({
    nom: "", prenom: "", email: "", pseudo: "", 
    telephone: "06 00 00 00 00", adresse: "Paris, France", 
    specialite: "Développement", bio: "", iban: "FR76 0000 0000 0000"
  });

  const [sessionsDuProf, setSessionsDuProf] = useState([]);
  const [planningProf, setPlanningProf] = useState([]);
  const [prochaineSession, setProchaineSession] = useState(null);

  // Charger les données au montage
  useEffect(() => {
    const chargerDonnees = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) { navigate('/connexion'); return; }
        const user = JSON.parse(userStr);
        if (user.role !== 'INTERVENANT') { navigate('/connexion'); return; }

        setInfosProf(prev => ({ ...prev, ...user }));

        const [sessions, planning] = await Promise.all([
            fetch(`${API_URL}/sessions`, { headers: getAuthHeaders() }).then(res => res.json()),
            fetch(`${API_URL}/planning`, { headers: getAuthHeaders() }).then(res => res.json())
        ]);

        setSessionsDuProf(Array.isArray(sessions) ? sessions : []);
        setPlanningProf(Array.isArray(planning) ? planning : []);
        
        if (sessions && sessions.length > 0) {
            setProchaineSession(sessions[0]);
        }

      } catch (err) { console.error("Erreur chargement:", err); } finally { setLoading(false); }
    };
    chargerDonnees();
  }, [navigate]);

  // Extraction Apprentis Uniques
  const mesApprentis = useMemo(() => {
    const map = new Map();
    sessionsDuProf.forEach(session => {
        if (session.participants && Array.isArray(session.participants)) {
            session.participants.forEach(p => {
                if (!map.has(p.id)) {
                    map.set(p.id, { ...p, sessionsCount: 1 });
                } else {
                    const existing = map.get(p.id);
                    existing.sessionsCount += 1;
                }
            });
        }
    });
    return Array.from(map.values());
  }, [sessionsDuProf]);

  const statsDonnees = useMemo(() => {
    return {
        totalSessions: sessionsDuProf.length,
        totalHeures: sessionsDuProf.length * 7,
        prochainEvenement: prochaineSession ? prochaineSession.dateDebut : "Aucun",
        totalApprentis: mesApprentis.length
    };
  }, [sessionsDuProf, prochaineSession, mesApprentis]);

  const handleInputChange = (e) => setInfosProf({ ...infosProf, [e.target.name]: e.target.value });
  const handleSaveProfile = (e) => { e.preventDefault(); setNotification("Profil enregistré."); };
  
  // --- LOGOUT ---
  const handleLogout = () => { localStorage.clear(); navigate('/connexion'); };

  if (loading) return <div className="min-h-screen bg-[#050507] flex items-center justify-center text-white">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#050507] text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div><h1 className="text-3xl font-bold tracking-tighter uppercase italic">Espace Intervenant</h1><p className="text-gray-500 text-sm">Bonjour, {infosProf.prenom} {infosProf.nom}</p></div>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab("planning")} className="p-3 bg-[#1F1F23] rounded-2xl hover:bg-[#2A2A30] transition"><Calendar size={20} className="text-gray-400" /></button>
            <button onClick={() => setActiveTab("donnees")} className="p-3 bg-[#5B4DFF]/10 border border-[#5B4DFF]/20 rounded-2xl text-[#5B4DFF] hover:bg-[#5B4DFF]/20 transition"><User size={20} /></button>
            {/* BOUTON LOGOUT */}
            <button onClick={handleLogout} className="p-3 bg-[#1F1F23] rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition"><LogOut size={20} /></button>
          </div>
        </div>

        <div className="flex gap-8 mb-8 border-b border-[#1F1F23]">
          {['dashboard', 'planning', 'apprentis', 'donnees'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#5B4DFF] border-b-2 border-[#5B4DFF]' : 'text-gray-500'}`}>{tab}</button>
          ))}
        </div>

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#0A0A0C] border border-[#1F1F23] p-8 rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-[#5B4DFF]/10 group-hover:text-[#5B4DFF]/20 transition-all"><Clock size={120} /></div>
              <h2 className="text-gray-500 text-xs font-bold uppercase mb-4 flex items-center gap-2"><div className="w-2 h-2 bg-[#5B4DFF] rounded-full animate-pulse" /> Prochaine Session</h2>
              {prochaineSession ? (
                <>
                  <h3 className="text-4xl font-black mb-2 italic uppercase">{prochaineSession.formation?.titre}</h3>
                  <div className="flex flex-wrap gap-6 text-gray-400 mt-6">
                    <div className="flex items-center gap-2"><Calendar size={18}/> <span>{prochaineSession.dateDebut}</span></div>
                    <div className="flex items-center gap-2"><MapPin size={18}/> <span>{prochaineSession.lieu} - {prochaineSession.salle}</span></div>
                    <div className="flex items-center gap-2"><Clock size={18}/> <span>{prochaineSession.horaires}</span></div>
                  </div>
                </>
              ) : <p className="text-gray-500 italic">Aucune session planifiée.</p>}
            </div>
            <div className="bg-[#5B4DFF] p-8 rounded-3xl shadow-[0_20px_40px_rgba(91,77,255,0.2)]">
                <h2 className="text-white/60 text-xs font-bold uppercase mb-6 tracking-widest">Activité</h2>
                <div className="text-5xl font-black mb-2 italic">{statsDonnees.totalSessions}</div>
                <p className="text-white/80 font-bold uppercase text-xs">Sessions attitrées au total</p>
                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-end"><div><p className="text-white/60 text-[10px] uppercase font-bold">Apprentis suivis</p><p className="text-2xl font-bold">{statsDonnees.totalApprentis}</p></div><Users size={32} /></div>
            </div>
          </div>
        )}

        {activeTab === "planning" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-6">Toutes mes sessions planifiées</h2>
            {planningProf.length > 0 ? planningProf.map(session => (
              <div key={session.id} className="bg-[#0A0A0C] border border-[#1F1F23] p-6 rounded-2xl flex justify-between items-center hover:border-[#5B4DFF]/50 transition cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="bg-[#1F1F23] p-4 rounded-xl text-center min-w-[80px]">
                    <p className="text-[#5B4DFF] font-black text-xl">{session.dateDebut.split('-')[2]}</p>
                    <p className="text-gray-500 text-[10px] uppercase font-bold">{session.dateDebut.split('-')[1]}</p>
                  </div>
                  <div><h4 className="font-bold text-lg italic uppercase">{session.formation?.titre}</h4><p className="text-gray-500 text-sm flex items-center gap-2"><MapPin size={14}/> {session.lieu} - {session.salle}</p></div>
                </div>
                <button className="p-3 bg-[#1F1F23] rounded-xl hover:bg-[#5B4DFF] hover:text-white transition group"><ChevronRight size={20} className="group-hover:translate-x-1 transition" /></button>
              </div>
            )) : <p className="text-gray-500 italic">Votre planning est vide.</p>}
          </div>
        )}

        {activeTab === "apprentis" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Users size={24} className="text-[#5B4DFF]" /> Mes Apprentis Inscrits <span className="text-xs bg-[#1F1F23] text-gray-400 px-3 py-1 rounded-full">{mesApprentis.length}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mesApprentis.length > 0 ? mesApprentis.map(etu => (
                    <div key={etu.id} className="bg-[#0A0A0C] border border-[#1F1F23] p-6 rounded-3xl hover:border-[#5B4DFF]/30 transition group">
                        <div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 rounded-full bg-[#1F1F23] flex items-center justify-center text-[#5B4DFF] font-bold text-lg border border-[#2A2A30] group-hover:border-[#5B4DFF] transition">{etu.prenom ? etu.prenom.charAt(0).toUpperCase() : "A"}</div><div><h4 className="font-bold text-white text-lg leading-tight">{etu.prenom} {etu.nom}</h4><p className="text-xs text-gray-500 font-mono">@{etu.pseudo}</p></div></div>
                        <div className="space-y-3 pt-4 border-t border-[#1F1F23]"><div className="flex items-center gap-3 text-sm text-gray-400"><Mail size={14} className="text-[#5B4DFF]" /> <span className="truncate">{etu.email}</span></div><div className="flex items-center gap-3 text-sm text-gray-400"><BookOpen size={14} className="text-[#5B4DFF]" /> <span>Inscrit à <b>{etu.sessionsCount}</b> de vos cours</span></div></div>
                    </div>
                )) : <div className="col-span-3 text-center p-12 bg-[#1F1F23]/30 rounded-3xl border border-dashed border-[#1F1F23]"><p className="text-gray-500 italic">Aucun apprenti n'est encore inscrit à vos sessions.</p></div>}
            </div>
          </div>
        )}

        {activeTab === "donnees" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-[#0A0A0C] border border-[#1F1F23] p-8 rounded-3xl">
              <h2 className="text-xl font-bold mb-8 italic uppercase">Modifier mon Profil</h2>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-2 gap-6"><div><label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Nom</label><input name="nom" value={infosProf.nom} onChange={handleInputChange} className="w-full bg-[#1F1F23] border border-transparent focus:border-[#5B4DFF] p-4 rounded-xl outline-none" /></div><div><label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Prénom</label><input name="prenom" value={infosProf.prenom} onChange={handleInputChange} className="w-full bg-[#1F1F23] border border-transparent focus:border-[#5B4DFF] p-4 rounded-xl outline-none" /></div></div>
                <div className="grid grid-cols-2 gap-6"><div><label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Email</label><input name="email" value={infosProf.email} onChange={handleInputChange} className="w-full bg-[#1F1F23] border border-transparent focus:border-[#5B4DFF] p-4 rounded-xl outline-none" /></div><div><label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">IBAN (Paiement)</label><input name="iban" value={infosProf.iban} onChange={handleInputChange} className="w-full bg-[#1F1F23] border border-transparent focus:border-[#5B4DFF] p-4 rounded-xl outline-none" /></div></div>
                <button type="submit" className="bg-[#5B4DFF] text-white font-black py-4 px-8 rounded-2xl italic uppercase tracking-widest hover:bg-[#4c3df0] transition">Mettre à jour mes informations</button>
              </form>
            </div>
            <div className="space-y-6"><div className="bg-[#1F1F23]/50 p-6 rounded-3xl border border-[#1F1F23]"><h4 className="font-bold mb-4 uppercase text-xs text-[#5B4DFF]">Résumé activité</h4><div className="space-y-4"><div className="flex justify-between"><span className="text-gray-500 text-sm">Prochaine séance</span><span className="text-white text-sm font-bold">{statsDonnees.prochainEvenement}</span></div><div className="flex justify-between"><span className="text-gray-500 text-sm">Total sessions</span><span className="text-white text-sm font-bold">{statsDonnees.totalSessions}</span></div></div></div></div>
          </div>
        )}

        {notification && <div className="fixed bottom-10 right-10 bg-[#5B4DFF] text-white px-8 py-4 rounded-2xl font-bold animate-in slide-in-from-right shadow-2xl">{notification}<button onClick={() => setNotification(null)} className="ml-4 opacity-50 hover:opacity-100">X</button></div>}
      </div>
    </div>
  );
};

export default IntervenantDashboard;