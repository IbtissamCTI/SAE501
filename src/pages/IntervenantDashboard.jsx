import React, { useState, useMemo } from "react";
import {
  Calendar, Clock, CheckCircle, FileText, User, 
  CreditCard, Save, ChevronLeft, Layout, BookOpen, 
  Users, MapPin, ChevronRight, X, Download, Plus, 
  Grid, List, AlertCircle, Trash2, Activity,
  Briefcase, BarChart3, CheckSquare
} from "lucide-react";


const Notification = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0A0A0C] border border-[#34D399]/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(52,211,153,0.15)] max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-[#34D399]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#34D399]">
          <CheckCircle size={32} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Succès !</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <button onClick={onClose} className="w-full bg-[#34D399] hover:bg-[#2dbd89] text-[#050507] font-bold py-3 rounded-xl transition">
          C'est noté
        </button>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A0A0C] border border-[#5B4DFF]/50 p-8 rounded-3xl shadow-[0_0_60px_rgba(91,77,255,0.2)] max-w-sm w-full text-center border-t-4 border-t-[#5B4DFF]">
        <div className="w-16 h-16 bg-[#5B4DFF]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#5B4DFF]">
          <AlertCircle size={32} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-8 text-sm">{message}</p>
        
        <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 bg-[#2D2D35] hover:bg-[#3E3E4A] text-white font-bold py-3 rounded-xl transition">
              Annuler
            </button>
            <button onClick={onConfirm} className="flex-1 bg-[#5B4DFF] hover:bg-[#4c3df0] text-white font-bold py-3 rounded-xl transition shadow-lg shadow-[#5B4DFF]/20">
              Confirmer
            </button>
        </div>
      </div>
    </div>
  );
};


const IntervenantDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notification, setNotification] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });
  
  const [sessionSelectionnee, setSessionSelectionnee] = useState(null);
  const [ongletSession, setOngletSession] = useState("appel"); 

  const [infosProf, setInfosProf] = useState({
    nom: "El Professor",
    email: "professor@school.com",
    telephone: "06 12 34 56 78",
    adresse: "42 Rue du Code, 75011 Paris",
    specialite: "Développement Fullstack JS",
    bio: "Passionné par l'enseignement et l'architecture logicielle. Expert React & Node.js avec 10 ans d'expérience.",
    iban: "FR76 1234 5678 9012 3456 7890 123"
  });

  const [colonnesNotes, setColonnesNotes] = useState([{ id: 1, titre: "Éval. 1" }]);

  const [eleves, setEleves] = useState([
    { id: 1, nom: "IbtissAm Chtioui", statut: "present", notes: { 1: 15 }, commentaire: "", devoirRendu: true, devoirFichier: "projet_react.zip" },
    { id: 2, nom: "Zitoune Chtioui", statut: "present", notes: { 1: 18 }, commentaire: "Excellent travail", devoirRendu: true, devoirFichier: "tp_hooks.zip" },
    { id: 3, nom: "Jean Dupont", statut: "retard", notes: { 1: 12 }, commentaire: "", devoirRendu: false, devoirFichier: null },
    { id: 4, nom: "Alice Merveille", statut: "absent", notes: {}, commentaire: "Absente", devoirRendu: true, devoirFichier: "rendu_final.pdf" },
    { id: 5, nom: "Paul Martin", statut: "present", notes: { 1: 9 }, commentaire: "À revoir", devoirRendu: false, devoirFichier: null },
  ]);

  const sessionsDuProf = [
    { id: 1, titre: "Développement React", type: "Bootcamp", groupe: "Groupe A", date: "2024-10-07", fin: "2024-12-20", salle: "Salle Turing" },
    { id: 2, titre: "Architecture Node.js", type: "Alternance", groupe: "Groupe B", date: "2024-10-12", fin: "2025-06-30", salle: "Salle Lovelace" },
  ];

  const planningProf = [
    { id: 1, titre: "React - Hooks", date: "2024-10-07", debut: "09:00", fin: "12:30", salle: "Salle 101", jour: 7 },
    { id: 2, titre: "React - Redux", date: "2024-10-08", debut: "14:00", fin: "17:30", salle: "Salle 102", jour: 8 },
    { id: 3, titre: "Projet Guidé", date: "2024-10-10", debut: "09:00", fin: "17:00", salle: "Labo 2", jour: 10 },
    { id: 4, titre: "Soutenance", date: "2024-10-24", debut: "10:00", fin: "12:00", salle: "Amphi", jour: 24 },
  ];

  const cardStyle = "bg-[#0A0A0C] rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#5B4DFF]/10";

  const statsGlobales = useMemo(() => {
    const totalEleves = eleves.length;
    const presents = eleves.filter(e => e.statut === 'present').length;
    const tauxPresence = Math.round((presents / totalEleves) * 100) || 0;
    const devoirsRendus = eleves.filter(e => e.devoirRendu).length;
    const tauxDevoirs = Math.round((devoirsRendus / totalEleves) * 100) || 0;

    let totalNotes = 0;
    let countNotes = 0;
    eleves.forEach(e => {
        Object.values(e.notes).forEach(n => {
            if(!isNaN(parseFloat(n))) {
                totalNotes += parseFloat(n);
                countNotes++;
            }
        });
    });
    const moyenneGenerale = countNotes > 0 ? (totalNotes / countNotes).toFixed(1) : "-";

    return { totalEleves, presents, tauxPresence, tauxDevoirs, moyenneGenerale };
  }, [eleves]);

  const handleInputChange = (e) => setInfosProf({ ...infosProf, [e.target.name]: e.target.value });
  
  const handleSaveProfile = (e) => { 
    e.preventDefault(); 
    setNotification("Profil mis à jour avec succès !"); 
  };
  
  const handleSaveSession = () => setNotification("Données de la session enregistrées.");
  
  const handleChangeStatus = (id, nouveauStatut) => {
    setEleves(eleves.map(e => e.id === id ? { ...e, statut: nouveauStatut } : e));
  };
  
  const handleAddColumn = () => {
    const newId = Date.now(); 
    setColonnesNotes([...colonnesNotes, { id: newId, titre: `Éval. ${colonnesNotes.length + 1}` }]);
    setNotification("Nouvelle colonne ajoutée.");
  };

  const handleDeleteColumnRequest = (colonneId) => {
    setConfirmModal({
        isOpen: true,
        title: "Supprimer l'évaluation ?",
        message: "Cette action est irréversible. Toutes les notes associées seront perdues.",
        onConfirm: () => {
            setColonnesNotes(colonnesNotes.filter(col => col.id !== colonneId));
            setEleves(eleves.map(eleve => {
                const newNotes = { ...eleve.notes };
                delete newNotes[colonneId]; 
                return { ...eleve, notes: newNotes };
            }));
            setConfirmModal({ ...confirmModal, isOpen: false });
            setNotification("Colonne supprimée.");
        }
    });
  };
  
  const handleChangeNote = (eleveId, colonneId, valeur) => {
    setEleves(eleves.map(e => e.id === eleveId ? { ...e, notes: { ...e.notes, [colonneId]: valeur } } : e));
  };
  
  const handleChangeComment = (id, val) => {
    setEleves(eleves.map(e => e.id === id ? { ...e, commentaire: val } : e));
  };

  const VueDashboard = () => (
    <div className="animate-in fade-in space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className={`${cardStyle} p-6 flex items-center gap-5`}>
                <div className="w-14 h-14 rounded-2xl bg-[#2E1A47] flex items-center justify-center text-[#A78BFA]">
                    <Users size={24} strokeWidth={2}/>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white leading-none mb-1">{statsGlobales.totalEleves}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">APPRENTIS ACTIFS</p>
                </div>
            </div>

            <div className={`${cardStyle} p-6 flex items-center gap-5`}>
                <div className="w-14 h-14 rounded-2xl bg-[#1A3328] flex items-center justify-center text-[#34D399]">
                    <FileText size={24} strokeWidth={2}/>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white leading-none mb-1">{sessionsDuProf.length}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">SESSIONS EN COURS</p>
                </div>
            </div>

            <div className={`${cardStyle} p-6 flex items-center gap-5`}>
                <div className="w-14 h-14 rounded-2xl bg-[#1E2030] flex items-center justify-center text-[#818CF8]">
                    <CheckCircle size={24} strokeWidth={2}/>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white leading-none mb-1">{statsGlobales.tauxPresence} %</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TAUX DE PRÉSENCE</p>
                </div>
            </div>

            <div className={`${cardStyle} p-6 flex items-center gap-5`}>
                <div className="w-14 h-14 rounded-2xl bg-[#162645] flex items-center justify-center text-[#3B82F6]">
                    <Clock size={24} strokeWidth={2}/>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white leading-none mb-1">12h</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">HEURES SEMAINE</p>
                </div>
            </div>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${cardStyle} md:col-span-2 p-8 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 bg-[#5B4DFF] w-40 h-40 blur-[120px] opacity-15 pointer-events-none"></div>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                    <div className="bg-[#1F1F23] p-2 rounded-lg text-[#5B4DFF]">
                        <Clock size={20} strokeWidth={2}/> 
                    </div>
                    Prochain cours
                </h2>
                <div className="flex flex-col md:flex-row justify-between items-center bg-[#1F1F23]/40 p-6 rounded-2xl backdrop-blur-md relative z-10">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-[#5B4DFF]/10 flex flex-col items-center justify-center text-[#5B4DFF]">
                            <span className="text-xs font-bold uppercase">Oct</span>
                            <span className="text-2xl font-bold">07</span>
                        </div>
                        <div>
                            <span className="text-[#A78BFA] font-bold text-xs uppercase tracking-wider mb-1 block">Aujourd'hui • 09:00 - 12:30</span>
                            <h3 className="text-2xl font-bold text-white">Développement React</h3>
                            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2"><Users size={14}/> Groupe A • Hooks & Context</p>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center gap-4 bg-[#050507]/50 p-3 rounded-xl">
                         <div className="text-right hidden md:block">
                            <p className="text-white font-bold text-sm">Salle Turing</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">2ème étage</p>
                         </div>
                         <div className="w-10 h-10 bg-[#2D1B4E] rounded-lg flex items-center justify-center text-[#A78BFA]">
                            <MapPin size={18} strokeWidth={1.5}/>
                         </div>
                    </div>
                </div>
            </div>
            
            <div className={`${cardStyle} p-6 flex flex-col gap-4`}>
                <h2 className="text-lg font-bold text-white mb-2">Actions Rapides</h2>
                <button onClick={() => setActiveTab('planning')} className="flex items-center gap-4 p-4 rounded-2xl bg-[#1F1F23] hover:bg-[#2D2D35] transition text-left group">
                    <div className="bg-[#5B4DFF]/10 p-3 rounded-xl text-[#5B4DFF] group-hover:bg-[#5B4DFF] group-hover:text-white transition">
                        <Calendar size={22} strokeWidth={1.5}/>
                    </div>
                    <div>
                        <span className="font-bold text-white block">Planning</span>
                        <span className="text-xs text-gray-500 group-hover:text-gray-300">Voir l'emploi du temps</span>
                    </div>
                </button>
                <button onClick={() => { setActiveTab('sessions'); setOngletSession('notes'); }} className="flex items-center gap-4 p-4 rounded-2xl bg-[#1F1F23] hover:bg-[#2D2D35] transition text-left group">
                    <div className="bg-[#34D399]/10 p-3 rounded-xl text-[#34D399] group-hover:bg-[#34D399] group-hover:text-[#050507] transition">
                        <CheckCircle size={22} strokeWidth={1.5}/>
                    </div>
                    <div>
                        <span className="font-bold text-white block">Noter</span>
                        <span className="text-xs text-gray-500 group-hover:text-gray-300">Saisir les résultats</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
  );

  const VuePlanning = () => {
    const [vueCalendrier, setVueCalendrier] = useState(false);
    return (
      <div className="animate-in fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Mon Emploi du Temps</h2>
          <button onClick={() => setVueCalendrier(!vueCalendrier)} className="flex items-center gap-2 bg-[#1F1F23] px-4 py-2 rounded-xl text-sm font-bold text-[#A78BFA] hover:text-white transition">
            {vueCalendrier ? <><List size={16}/> Vue Liste</> : <><Grid size={16}/> Vue Calendrier</>}
          </button>
        </div>
        {vueCalendrier ? (
          <div className={`${cardStyle} p-6`}>
             <div className="grid grid-cols-7 gap-4 mb-4 text-center text-gray-500 font-bold uppercase text-xs">
                <div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div>
             </div>
             <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const coursCeJour = planningProf.find(c => c.jour === day);
                  return (
                    <div key={day} className={`min-h-[100px] p-3 rounded-2xl border ${coursCeJour ? 'bg-[#2D1B4E]/50 border-[#5B4DFF]/50' : 'bg-[#1F1F23]/50 border-transparent'} relative group transition-all hover:bg-[#1F1F23]`}>
                      <span className={`text-sm font-bold ${coursCeJour ? 'text-white' : 'text-gray-600'}`}>{day}</span>
                      {coursCeJour && (
                        <div className="mt-2">
                          <div className="text-[10px] font-bold text-[#A78BFA] bg-[#2D1B4E] px-1.5 py-0.5 rounded w-fit mb-1">{coursCeJour.debut}</div>
                          <div className="text-xs font-bold text-white leading-tight">{coursCeJour.titre}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
             </div>
          </div>
        ) : (
          <div className={`${cardStyle} p-6 space-y-4`}>
              {planningProf.map(cours => (
                <div key={cours.id} className="flex flex-col md:flex-row gap-4 p-4 hover:bg-[#1F1F23] rounded-2xl transition items-center bg-[#1F1F23]/50">
                  <div className="w-20 flex flex-col items-center justify-center bg-[#1F1F23] rounded-xl p-3 border border-gray-800">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">OCT</span>
                    <span className="text-2xl font-bold text-white">{cours.jour}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white">{cours.titre}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-1"><Clock size={14} className="text-[#5B4DFF]"/> {cours.debut} - {cours.fin}</p>
                  </div>
                  <div className="flex items-center text-[#A78BFA] font-bold bg-[#2D1B4E]/50 px-4 py-2 rounded-xl">
                    <MapPin size={16} className="mr-2"/> {cours.salle}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  const VueSessions = () => {
    if (sessionSelectionnee) {
      return (
        <div className="animate-in fade-in">
          <button onClick={() => setSessionSelectionnee(null)} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-white transition group">
            <div className="bg-[#1F1F23] p-2 rounded-lg group-hover:bg-[#5B4DFF] transition"><ChevronLeft size={16}/></div> 
            Retour aux sessions
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">{sessionSelectionnee.titre}</h2>
              <p className="text-[#A78BFA] font-medium mt-1">{sessionSelectionnee.groupe} • {sessionSelectionnee.type}</p>
            </div>
            <div className="flex bg-[#0A0A0C] p-1.5 rounded-xl border border-[#1F1F23]">
              {['appel', 'notes', 'devoirs'].map(tab => (
                <button key={tab} onClick={() => setOngletSession(tab)} className={`px-5 py-2.5 rounded-lg text-sm font-bold transition capitalize ${ongletSession === tab ? "bg-[#5B4DFF] text-white shadow-lg shadow-[#5B4DFF]/25" : "text-gray-500 hover:text-white"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          {ongletSession === 'notes' && (
             <div className="flex gap-4 mb-6">
                <div className="bg-[#0A0A0C] p-4 rounded-2xl flex items-center gap-4 border border-[#5B4DFF]/30 shadow-lg">
                   <div className="w-10 h-10 bg-[#5B4DFF]/10 rounded-lg flex items-center justify-center text-[#5B4DFF] font-bold">AVG</div>
                   <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Moyenne Classe</p>
                      <p className="text-2xl font-bold text-white">{statsGlobales.moyenneGenerale} <span className="text-sm text-gray-500">/ 20</span></p>
                   </div>
                </div>
                <button onClick={handleAddColumn} className="bg-[#0A0A0C] hover:bg-[#1F1F23] text-gray-400 p-4 rounded-2xl flex items-center gap-2 font-bold transition group border border-dashed border-gray-700 hover:border-[#5B4DFF]">
                   <div className="bg-[#5B4DFF]/10 p-1 rounded-md group-hover:bg-[#5B4DFF] group-hover:text-white transition"><Plus size={18}/></div> 
                   Ajouter une colonne
                </button>
             </div>
          )}
          <div className={`${cardStyle} p-0 overflow-x-auto`}>
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-[#18181b] text-gray-400 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-5 pl-6 sticky left-0 bg-[#18181b] z-10">Étudiant</th>
                  {ongletSession === "appel" && <><th className="p-5 text-center">Statut</th><th className="p-5 text-right pr-6">Action</th></>}
                  {ongletSession === "notes" && (
                    <>
                        {colonnesNotes.map(col => (
                            <th key={col.id} className="p-5 text-center min-w-[120px] group relative">
                                <span>{col.titre}</span>
                                <button onClick={() => handleDeleteColumnRequest(col.id)} className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 text-red-500 rounded-lg transition" title="Supprimer">
                                    <Trash2 size={14} />
                                </button>
                            </th>
                        ))}
                        <th className="p-5 text-right pr-6">Commentaire</th>
                    </>
                  )}
                  {ongletSession === "devoirs" && <><th className="p-5 text-center">Statut Rendu</th><th className="p-5 text-right pr-6">Fichier</th></>}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F23]">
                {eleves.map(eleve => (
                  <tr key={eleve.id} className="hover:bg-[#1F1F23]/50 transition">
                    <td className="p-4 pl-6 font-bold text-white flex items-center gap-3 sticky left-0 bg-[#0A0A0C] md:bg-transparent z-10">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
                        {eleve.nom.charAt(0)}
                      </div>
                      {eleve.nom}
                    </td>
                    {ongletSession === "appel" && (
                      <>
                        <td className="p-4 text-center">
                          {eleve.statut === "present" && <span className="text-[#34D399] bg-[#163E2B]/50 px-3 py-1 rounded-full text-xs font-bold border border-[#34D399]/20 flex items-center justify-center gap-1 w-fit mx-auto"><CheckCircle size={12}/> Présent</span>}
                          {eleve.statut === "retard" && <span className="text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/20 flex items-center justify-center gap-1 w-fit mx-auto"><Clock size={12}/> Retard</span>}
                          {eleve.statut === "absent" && <span className="text-red-400 bg-red-900/20 px-3 py-1 rounded-full text-xs font-bold border border-red-500/20 flex items-center justify-center gap-1 w-fit mx-auto"><X size={12}/> Absent</span>}
                        </td>
                        <td className="p-4 pr-6 flex justify-end gap-2">
                          <button onClick={() => handleChangeStatus(eleve.id, 'present')} className="p-2 rounded-lg bg-[#1F1F23] hover:bg-[#163E2B] text-gray-500 hover:text-[#34D399] transition"><CheckCircle size={18}/></button>
                          <button onClick={() => handleChangeStatus(eleve.id, 'retard')} className="p-2 rounded-lg bg-[#1F1F23] hover:bg-yellow-900/30 text-gray-500 hover:text-yellow-400 transition"><Clock size={18}/></button>
                          <button onClick={() => handleChangeStatus(eleve.id, 'absent')} className="p-2 rounded-lg bg-[#1F1F23] hover:bg-red-900/30 text-gray-500 hover:text-red-400 transition"><X size={18}/></button>
                        </td>
                      </>
                    )}
                    {ongletSession === "notes" && (
                      <>
                        {colonnesNotes.map(col => (
                            <td key={col.id} className="p-4 text-center">
                                <input type="number" max="20" value={eleve.notes[col.id] || ''} onChange={(e) => handleChangeNote(eleve.id, col.id, e.target.value)}
                                    className={`w-16 bg-[#0A0A0C] border border-[#1F1F23] ${eleve.notes[col.id] < 10 && eleve.notes[col.id] !== "" ? 'text-red-400 border-red-500/30' : 'text-white'} rounded-lg p-2 text-center font-bold focus:bg-[#1F1F23] focus:border-[#5B4DFF] outline-none transition`}
                                    placeholder="-" />
                            </td>
                        ))}
                        <td className="p-4 pr-6 text-right">
                          <input value={eleve.commentaire} onChange={(e) => handleChangeComment(eleve.id, e.target.value)} className="bg-transparent text-right text-gray-400 text-sm outline-none w-full hover:text-white transition" placeholder="Appréciation..." />
                        </td>
                      </>
                    )}
                    {ongletSession === "devoirs" && (
                      <>
                        <td className="p-4 text-center">
                          {eleve.devoirRendu ? <span className="flex items-center justify-center gap-2 text-[#A78BFA] font-bold text-xs"><CheckCircle size={14}/> Rendu</span> : <span className="flex items-center justify-center gap-2 text-gray-600 font-bold text-xs"><AlertCircle size={14}/> Non rendu</span>}
                        </td>
                        <td className="p-4 pr-6 text-right flex justify-end">
                           {eleve.devoirRendu ? <button className="flex items-center gap-2 bg-[#2D1B4E]/50 hover:bg-[#5B4DFF] text-[#A78BFA] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition border border-[#5B4DFF]/20"><FileText size={14}/> {eleve.devoirFichier} <Download size={14}/></button> : <span className="text-gray-700 text-xs italic">Aucun fichier</span>}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={handleSaveSession} className="bg-[#5B4DFF] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#4c3df0] shadow-lg shadow-[#5B4DFF]/20 flex items-center gap-2 transform active:scale-95 transition">
              <Save size={18}/> Enregistrer les changements
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="animate-in fade-in">
        <h2 className="text-xl font-bold text-white mb-6">Mes Sessions Actives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessionsDuProf.map(session => (
            <div key={session.id} onClick={() => setSessionSelectionnee(session)} className={`${cardStyle} p-6 cursor-pointer group relative overflow-hidden hover:border-[#5B4DFF]/30`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B4DFF]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <span className="text-[10px] text-[#A78BFA] font-bold uppercase bg-[#2D1B4E] px-2 py-1 rounded tracking-wider border border-[#A78BFA]/20">{session.type}</span>
                  <h3 className="text-2xl font-bold text-white mt-3 group-hover:text-[#5B4DFF] transition">{session.titre}</h3>
                  <p className="text-gray-400 text-sm mt-1">{session.groupe}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1F1F23] border border-gray-800 flex items-center justify-center text-gray-500 group-hover:bg-[#5B4DFF] group-hover:border-[#5B4DFF] group-hover:text-white transition shadow-lg">
                  <ChevronRight size={20}/>
                </div>
              </div>
              <div className="pt-4 mt-4 flex justify-between text-xs font-bold text-gray-500 border-t border-[#1F1F23]">
                <span className="flex items-center gap-2"><Calendar size={14}/> {session.fin}</span>
                <span className="flex items-center gap-2"><Users size={14}/> {eleves.length} Élèves</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white p-6 md:p-10 font-sans relative selection:bg-[#5B4DFF]/30 pb-20">
      
    
      <div className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Espace Intervenant</h1>
            <p className="text-gray-400">Bienvenue, <span className="text-[#5B4DFF]">{infosProf.nom}</span>.</p>
        </div>
        <div onClick={() => setActiveTab('profil')} className="w-14 h-14 bg-[#0A0A0C] rounded-full flex items-center justify-center font-bold text-xl shadow-lg cursor-pointer hover:scale-105 transition border-2 border-[#1F1F23] hover:border-[#5B4DFF]">
          <span className="text-white">{infosProf.nom.charAt(0)}</span>
        </div>
      </div>

     
      <div className="flex overflow-x-auto gap-4 mb-10 pb-2 border-b border-[#1F1F23]">
        {[ { id: 'dashboard', label: "Vue d'ensemble", icon: Layout }, { id: 'planning', label: 'Planning', icon: Calendar }, { id: 'sessions', label: 'Sessions & Notes', icon: BookOpen }, { id: 'profil', label: 'Mon Profil', icon: User } ].map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSessionSelectionnee(null); }} className={`flex items-center gap-2 px-6 py-4 rounded-t-2xl font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === tab.id ? 'border-[#5B4DFF] text-white bg-[#0A0A0C]' : 'border-transparent text-gray-500 hover:text-white hover:bg-[#0A0A0C]/50'}`}>
            <tab.icon size={18} strokeWidth={2}/> {tab.label}
          </button>
        ))}
      </div>

      
      <div className="min-h-[400px]">
        {activeTab === 'dashboard' && <VueDashboard />}
        {activeTab === 'planning' && <VuePlanning />}
        {activeTab === 'sessions' && <VueSessions />}
        
       
        {activeTab === 'profil' && (
          <div className="animate-in fade-in max-w-4xl mx-auto space-y-8">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Mon Profil Intervenant</h2>
                <div className="text-sm text-gray-500 bg-[#0A0A0C] px-3 py-1 rounded-full border border-[#1F1F23]">Dernière maj : 04/01/2026</div>
             </div>
             
             <form onSubmit={handleSaveProfile} className="space-y-8">
            
                <div className={`${cardStyle} p-8`}>
                    <h3 className="text-lg font-bold text-[#A78BFA] mb-6 flex items-center gap-3">
                        <div className="p-2 bg-[#A78BFA]/10 rounded-lg"><User size={20}/></div>
                        Identité & Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="block text-gray-500 text-xs font-bold uppercase mb-2">Nom complet</label><input name="nom" value={infosProf.nom} onChange={handleInputChange} className="w-full bg-[#1F1F23] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-[#5B4DFF] border border-transparent focus:border-[#5B4DFF]/50 transition"/></div>
                        <div><label className="block text-gray-500 text-xs font-bold uppercase mb-2">Email professionnel</label><input name="email" value={infosProf.email} onChange={handleInputChange} className="w-full bg-[#1F1F23] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-[#5B4DFF] border border-transparent focus:border-[#5B4DFF]/50 transition"/></div>
                        <div><label className="block text-gray-500 text-xs font-bold uppercase mb-2">Téléphone</label><input name="telephone" value={infosProf.telephone} onChange={handleInputChange} className="w-full bg-[#1F1F23] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-[#5B4DFF] border border-transparent focus:border-[#5B4DFF]/50 transition"/></div>
                        <div><label className="block text-gray-500 text-xs font-bold uppercase mb-2">Adresse postale</label><input name="adresse" value={infosProf.adresse} onChange={handleInputChange} className="w-full bg-[#1F1F23] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-[#5B4DFF] border border-transparent focus:border-[#5B4DFF]/50 transition"/></div>
                    </div>
                </div>

                <div className={`${cardStyle} p-8`}>
                    <h3 className="text-lg font-bold text-[#60A5FA] mb-6 flex items-center gap-3">
                        <div className="p-2 bg-[#60A5FA]/10 rounded-lg"><Briefcase size={20}/></div>
                        Informations Professionnelles
                    </h3>
                    <div className="space-y-6">
                        <div><label className="block text-gray-500 text-xs font-bold uppercase mb-2">Spécialité</label><input name="specialite" value={infosProf.specialite} onChange={handleInputChange} className="w-full bg-[#1F1F23] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-[#60A5FA] border border-transparent focus:border-[#60A5FA]/50 transition"/></div>
                        <div><label className="block text-gray-500 text-xs font-bold uppercase mb-2">Biographie</label><textarea name="bio" rows="4" value={infosProf.bio} onChange={handleInputChange} className="w-full bg-[#1F1F23] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-[#60A5FA] border border-transparent focus:border-[#60A5FA]/50 transition resize-none"/></div>
                    </div>
                </div>

                <div className={`${cardStyle} p-8`}>
                    <h3 className="text-lg font-bold text-[#34D399] mb-6 flex items-center gap-3">
                        <div className="p-2 bg-[#34D399]/10 rounded-lg"><CreditCard size={20}/></div>
                        Coordonnées Bancaires (RIB)
                    </h3>
                    <div><label className="block text-gray-500 text-xs font-bold uppercase mb-2">IBAN</label><input name="iban" value={infosProf.iban} onChange={handleInputChange} className="w-full bg-[#1F1F23] rounded-xl p-4 text-white font-mono tracking-wider outline-none focus:ring-1 focus:ring-[#34D399] border border-transparent focus:border-[#34D399]/50 transition"/></div>
                </div>

                <button className="w-full bg-[#5B4DFF] hover:bg-[#4c3df0] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#5B4DFF]/30 transition flex justify-center items-center gap-2">
                    <Save size={20}/> Sauvegarder les modifications
                </button>
             </form>
          </div>
        )}
      </div>
      {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
      <ConfirmationModal isOpen={confirmModal.isOpen} title={confirmModal.title} message={confirmModal.message} onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })} onConfirm={confirmModal.onConfirm} />
    </div>
  );
};

export default IntervenantDashboard;