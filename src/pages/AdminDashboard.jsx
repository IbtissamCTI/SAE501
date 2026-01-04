import React, { useState } from "react";
import {
  Users, Calendar, Clock, CheckCircle, Plus, X, Search, Trash2, Edit,
  FileText, BarChart2, Award, BookOpen, Layout, ChevronLeft, ChevronRight,
  Eye, AlertCircle, TrendingUp, Layers, AlertTriangle, Check
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); 

  const [modalState, setModalState] = useState({
    session: false,
    prof: false,
    event: false,
    student: null,    
    attendanceDate: null, 
    attendance: null, 
    stats: null,      
    editProf: null    
  });

  const [editingAttendanceId, setEditingAttendanceId] = useState(null);

  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [attendanceStatus, setAttendanceStatus] = useState({
    1: 'present', 2: 'present', 3: 'retard', 4: 'absent'
  });

  const [filters, setFilters] = useState({
    session: "Tous",
    studentSearch: ""
  });

  const intenseNeonBase = "bg-[#0F0F11] border border-[#1F1F23] shadow-[0_0_20px_rgba(91,77,255,0.1)] hover:shadow-[0_0_40px_rgba(91,77,255,0.3)] hover:border-[#5B4DFF]/50 transition-all duration-300";
  
  const statsKPI = [
    { id: 1, label: "APPRENTIS TOTAL", valeur: 124, icon: Users, bg: "bg-[#2D1B4E]", color: "text-[#A78BFA]", glow: "hover:shadow-[0_0_30px_rgba(167,139,250,0.6)] hover:border-[#A78BFA] hover:-translate-y-2" },
    { id: 2, label: "SESSIONS ACTIVES", valeur: 3, icon: Calendar, bg: "bg-[#163E2B]", color: "text-[#34D399]", glow: "hover:shadow-[0_0_30px_rgba(52,211,153,0.6)] hover:border-[#34D399] hover:-translate-y-2" },
    { id: 3, label: "TAUX DE RÉUSSITE", valeur: "92 %", icon: Award, bg: "bg-[#1E3A8A]", color: "text-[#60A5FA]", glow: "hover:shadow-[0_0_30px_rgba(96,165,250,0.6)] hover:border-[#60A5FA] hover:-translate-y-2" },
    { id: 4, label: "HEURES DISPENSÉES", valeur: "120H", icon: Clock, bg: "bg-[#4C1D95]", color: "text-[#C084FC]", glow: "hover:shadow-[0_0_30px_rgba(192,132,252,0.6)] hover:border-[#C084FC] hover:-translate-y-2" },
  ];

  const [sessions, setSessions] = useState([
    { id: 1, categorie: "Développement", formation: "Développeur Fullstack", type: "Bootcamp", debut: "2023-09-01", fin: "2023-12-01", prof: "El Professor", statut: "Terminé", presence: 98 },
    { id: 2, categorie: "Développement", formation: "React & Node.js Elite", type: "Alternance", debut: "2024-01-15", fin: "2024-06-15", prof: "Mr White", statut: "En cours", presence: 85 },
    { id: 3, categorie: "Data", formation: "Data Analyst", type: "Intensif", debut: "2024-02-01", fin: "2024-05-01", prof: "Zitoune", statut: "En cours", presence: 92 },
  ]);

  const [students] = useState([
    { id: 1, nom: "IbtissAm Chtioui", formation: "React Elite", presence: 80, certificat: false, absences: 4, participation: "Moyenne", niveau: "Intermédiaire", projets: 3 },
    { id: 2, nom: "Zitoune Chtioui", formation: "Data Analyst", presence: 95, certificat: true, absences: 1, participation: "Excellente", niveau: "Avancé", projets: 5 },
    { id: 3, nom: "Jean Dupont", formation: "React Elite", presence: 100, certificat: false, absences: 0, participation: "Bonne", niveau: "Débutant", projets: 2 },
    { id: 4, nom: "Alice Merveille", formation: "Fullstack", presence: 45, certificat: false, absences: 12, participation: "Faible", niveau: "En difficulté", projets: 0 },
  ]);

  const [profs, setProfs] = useState([
    { id: 1, nom: "El Professor", specialite: "Fullstack", formations: ["Dev Fullstack"], heures: 35, total: 40, initiale: "E" },
    { id: 2, nom: "Mr White", specialite: "Backend", formations: ["React & Node"], heures: 38, total: 40, initiale: "M" },
    { id: 3, nom: "Ohayo Kamsamida", specialite: "Data", formations: ["Data Analyst"], heures: 20, total: 40, initiale: "O" },
  ]);

  const [planningEvents, setPlanningEvents] = useState([
    { id: 1, title: 'Bootcamp React', prof: 'El Professor', date: '2024-10-07', color: 'bg-purple-600' },
    { id: 2, title: 'Data Science', prof: 'Zitoune', date: '2024-10-12', color: 'bg-green-600' },
    { id: 3, title: 'UX Design', prof: 'Mr White', date: '2024-10-24', color: 'bg-blue-600' },
  ]);

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startingDay = firstDay === 0 ? 6 : firstDay - 1;
    return { daysInMonth, startingDay };
  };

  const handleAddSession = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setSessions([...sessions, {
      id: Date.now(),
      categorie: fd.get("categorie"),
      formation: fd.get("formation"),
      type: fd.get("type"),
      debut: fd.get("debut"),
      fin: fd.get("fin"),
      prof: fd.get("prof"),
      statut: "En cours",
      presence: 100
    }]);
    setModalState({ ...modalState, session: false });
  };

  const handleSaveProf = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newProf = {
      nom: fd.get("nom"), specialite: fd.get("specialite"),
      heures: +fd.get("heures"), total: +fd.get("total"),
      formations: ["Nouvelle"], initiale: fd.get("nom")[0].toUpperCase()
    };
    if (modalState.editProf) {
      setProfs(profs.map(p => p.id === modalState.editProf.id ? { ...p, ...newProf } : p));
    } else {
      setProfs([...profs, { id: Date.now(), ...newProf }]);
    }
    setModalState({ ...modalState, prof: false, editProf: null });
  };

  const confirmDelete = () => {
    if (deleteConfirm.type === 'prof') {
        setProfs(profs.filter(p => p.id !== deleteConfirm.id));
    }
    setDeleteConfirm(null);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const colors = ['bg-purple-600', 'bg-pink-600', 'bg-blue-600', 'bg-green-600'];
    setPlanningEvents([...planningEvents, {
      id: Date.now(),
      title: fd.get("titre"),
      prof: fd.get("prof"),
      date: fd.get("date"),
      color: colors[Math.floor(Math.random() * colors.length)]
    }]);
    setModalState({ ...modalState, event: false });
  };

  const filteredSessions = sessions.filter(s => filters.session === "Tous" || s.statut === filters.session);
  const filteredStudents = students.filter(s => s.nom.toLowerCase().includes(filters.studentSearch.toLowerCase()));
  const Modal = ({ title, onClose, children, maxWidth = "max-w-lg" }) => (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4 backdrop-blur-md animate-in fade-in">
      <div className={`bg-[#161618] border border-gray-700 p-8 rounded-3xl w-full ${maxWidth} relative shadow-[0_0_50px_rgba(91,77,255,0.2)]`}>
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition"><X size={24}/></button>
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );

  const getStatusBadge = (status) => {
    switch(status) {
        case 'present': return <span className="text-[#34D399] bg-[#163E2B] px-3 py-1 rounded-md text-xs font-bold border border-[#34D399]/30">Présent</span>;
        case 'retard': return <span className="text-yellow-400 bg-yellow-900/30 px-3 py-1 rounded-md text-xs font-bold border border-yellow-500/30">Retard</span>;
        case 'absent': return <span className="text-red-400 bg-red-900/30 px-3 py-1 rounded-md text-xs font-bold border border-red-500/30">Absent</span>;
        default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white p-6 md:p-10 font-sans relative selection:bg-[#5B4DFF]/30">
      
      {}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Administration</h1>
          <p className="text-gray-400">Vue d'ensemble et gestion pédagogique.</p>
        </div>
        <button onClick={() => setModalState({...modalState, session: true})} className="bg-[#5B4DFF] hover:bg-[#4c3df0] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(91,77,255,0.6)] hover:scale-105 transition-all duration-300">
          <Plus size={20}/> Nouvelle Session
        </button>
      </div>

      <div className="flex overflow-x-auto gap-2 mb-8 border-b border-[#1F1F23]">
        {[
          { id: 'dashboard', label: "Vue d'ensemble", icon: Layout },
          { id: 'planning', label: 'Planning', icon: Calendar },
          { id: 'sessions', label: 'Sessions', icon: BookOpen },
          { id: 'students', label: 'Apprenants', icon: Users },
          { id: 'profs', label: 'Intervenants', icon: CheckCircle }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} 
            className={`flex items-center gap-2 px-6 py-3 rounded-t-xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-[#1F1F23] text-white border-b-2 border-[#5B4DFF]' : 'text-gray-500 hover:text-white hover:bg-[#1F1F23]'}`}>
            <tab.icon size={16}/> {tab.label}
          </button>
        ))}
      </div>


      {activeTab === 'dashboard' && (
        <div className="animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {statsKPI.map(stat => (
              <div key={stat.id} className={`bg-[#0F0F11] border border-[#1F1F23] p-6 rounded-2xl flex items-center gap-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 ${stat.glow}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.bg} bg-opacity-30 transition-transform group-hover:scale-110`}>
                  <stat.icon className={stat.iconColor} size={28}/>
                </div>
                <div><h3 className="text-3xl font-extrabold text-white">{stat.valeur}</h3><p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className={`${intenseNeonBase} p-8 rounded-3xl`}>
                <h2 className="text-xl font-bold mb-6 text-white">Sessions en cours</h2>
                {sessions.filter(s => s.statut === 'En cours').map(s => (
                  <div key={s.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between mb-2"><span className="font-bold text-gray-200">{s.formation}</span><span className="text-[#34D399] text-xs bg-[#163E2B] px-2 py-1 rounded-md font-medium">Actif</span></div>
                    <div className="w-full bg-[#1F1F23] h-2 rounded-full overflow-hidden"><div className="bg-[#5B4DFF] h-full rounded-full shadow-[0_0_10px_rgba(91,77,255,0.8)]" style={{width: `${s.presence}%`}}></div></div>
                  </div>
                ))}
             </div>
             <div className={`${intenseNeonBase} p-8 rounded-3xl`}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><AlertCircle className="text-red-500"/> Alertes Récentes</h2>
                <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 font-bold">
                    <AlertTriangle size={20} />
                    <span>3 Étudiants sans certificats requis.</span>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'planning' && (
        <div className="animate-in fade-in">
          <div className="flex justify-between items-center mb-6">
            <div className={`flex items-center gap-4 p-2 rounded-xl ${intenseNeonBase}`}>
              <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-lg transition"><ChevronLeft/></button>
              <h2 className="text-lg font-bold w-48 text-center capitalize text-white">
                {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </h2>
              <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-lg transition"><ChevronRight/></button>
            </div>
            <button onClick={() => setModalState({...modalState, event: true})} className="bg-[#5B4DFF] hover:bg-[#4c3df0] px-4 py-2 rounded-xl font-bold flex gap-2 shadow-[0_0_20px_rgba(91,77,255,0.5)] transition hover:scale-105">
              <Plus size={18}/> Ajouter Event
            </button>
          </div>

          <div className={`${intenseNeonBase} p-6 rounded-3xl`}>
            <div className="grid grid-cols-7 mb-2 text-center text-gray-500 font-bold uppercase text-xs tracking-wider">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => <div key={d} className="py-3">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: getDaysInMonth(currentDate).startingDay }).map((_, i) => <div key={`empty-${i}`} className="bg-transparent"/>)}
              {Array.from({ length: getDaysInMonth(currentDate).daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}-${String(dayNum).padStart(2,'0')}`;
                const events = planningEvents.filter(e => e.date === dateStr);
                return (
                  <div key={dayNum} className={`min-h-[100px] border border-[#1F1F23] rounded-xl p-2 transition group relative bg-[#0F0F11] hover:bg-[#161618] hover:border-[#5B4DFF]/50 hover:shadow-[0_0_15px_rgba(91,77,255,0.2)]`}>
                    <span className={`text-sm font-bold ${events.length ? 'text-white' : 'text-gray-600'}`}>{dayNum}</span>
                    <div className="mt-2 space-y-1">
                      {events.map(ev => (
                        <div key={ev.id} className={`${ev.color} text-[10px] p-1.5 rounded-md font-bold truncate shadow-md text-white`}>{ev.title}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="animate-in fade-in space-y-4">
          <div className="flex gap-2 mb-4">
            {['Tous', 'En cours', 'Terminé'].map(f => (
              <button key={f} onClick={() => setFilters({...filters, session: f})} className={`px-4 py-2 rounded-lg text-sm font-bold transition ${filters.session === f ? 'bg-[#5B4DFF] text-white shadow-[0_0_15px_rgba(91,77,255,0.4)]' : 'text-gray-500 hover:text-white hover:bg-[#1F1F23]'}`}>{f}</button>
            ))}
          </div>
          {filteredSessions.map(session => (
            <div key={session.id} className={`${intenseNeonBase} flex flex-col md:flex-row justify-between items-center gap-4 mb-4 p-6 rounded-2xl`}>
              <div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{session.type}</span>
                <h3 className="text-lg font-bold text-white mt-1">{session.formation}</h3>
                <p className="text-sm text-[#A78BFA] font-medium mt-1">Resp: {session.prof}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setModalState({...modalState, attendance: session, attendanceDate: null})} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#163E2B] hover:bg-[#065F46] text-sm font-bold text-[#34D399] border border-[#34D399]/30 transition shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                  <FileText size={16}/> Émargement
                </button>
                <button onClick={() => setModalState({...modalState, stats: session})} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#A78BFA]/30 text-[#A78BFA] text-sm font-bold hover:bg-[#A78BFA]/10 transition hover:shadow-[0_0_15px_rgba(167,139,250,0.2)]">
                  <BarChart2 size={16}/> Voir Stats
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'students' && (
        <div className={`animate-in fade-in overflow-hidden rounded-3xl ${intenseNeonBase} p-0`}>
          <div className="p-6 border-b border-[#1F1F23] flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Apprenants</h2>
            <div className="relative"><Search className="absolute left-3 top-2.5 text-gray-500" size={16}/><input onChange={e => setFilters({...filters, studentSearch: e.target.value})} className="bg-[#18181B] pl-10 pr-4 py-2 rounded-xl text-sm outline-none focus:border-[#5B4DFF] border border-[#1F1F23] transition text-white w-64" placeholder="Rechercher..."/></div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-[#18181B] text-gray-400 uppercase text-xs font-bold"><tr><th className="p-4">Nom</th><th className="p-4">Formation</th><th className="p-4 text-center">Présence</th><th className="p-4 text-right">Action</th></tr></thead>
            <tbody>
              {filteredStudents.map(s => (
                <tr key={s.id} className="hover:bg-[#1F1F23] border-b border-[#1F1F23] last:border-0 transition">
                  <td className="p-4 font-bold flex items-center gap-3 text-white"><div className="w-9 h-9 rounded-full bg-[#2D1B4E] text-[#A78BFA] flex items-center justify-center text-sm">{s.nom[0]}</div>{s.nom}</td>
                  <td className="p-4 text-gray-400">{s.formation}</td>
                  <td className="p-4 text-center"><span className={`px-2 py-1 rounded-md text-xs font-bold ${s.presence < 80 ? 'text-red-400 bg-red-900/20' : 'text-[#34D399] bg-[#163E2B]'}`}>{s.presence}%</span></td>
                  <td className="p-4 text-right"><button onClick={() => setModalState({...modalState, student: s})} className="text-[#A78BFA] hover:text-white font-bold flex items-center gap-1 ml-auto border border-[#A78BFA]/30 px-3 py-1.5 rounded-lg hover:bg-[#A78BFA]/20 transition"><Eye size={14}/> Voir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'profs' && (
        <div className="animate-in fade-in">
          <div className="flex justify-end mb-6">
            <button onClick={() => setModalState({...modalState, prof: true, editProf: null})} className="flex items-center gap-2 border border-[#A78BFA] text-[#A78BFA] px-4 py-2 rounded-xl font-bold hover:bg-[#A78BFA]/10 hover:text-white transition shadow-[0_0_15px_rgba(167,139,250,0.3)]"><Plus size={16}/> Nouveau Prof</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profs.map(prof => (
              <div key={prof.id} className={`${intenseNeonBase} p-6 rounded-3xl group hover:border-[#A78BFA] hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#18181B] text-gray-300 flex items-center justify-center font-bold border border-[#1F1F23] text-lg group-hover:border-[#A78BFA] transition">{prof.initiale}</div>
                    <div><h3 className="font-bold text-white text-lg">{prof.nom}</h3><p className="text-xs text-gray-500 uppercase font-medium">{prof.specialite}</p></div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setModalState({...modalState, prof: true, editProf: prof})} className="p-2 bg-[#1F1F23] rounded-lg hover:text-white hover:bg-white/10 transition"><Edit size={16}/></button>
                    <button onClick={() => setDeleteConfirm({type: 'prof', id: prof.id})} className="p-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40 hover:text-white transition"><Trash2 size={16}/></button>
                  </div>
                </div>
                <div className="w-full bg-[#1F1F23] h-2.5 rounded-full overflow-hidden"><div className="bg-[#A78BFA] h-full shadow-[0_0_15px_rgba(167,139,250,0.6)] rounded-full" style={{width: `${(prof.heures/prof.total)*100}%`}}></div></div>
                <div className="flex justify-between text-xs mt-3 font-medium text-gray-400"><span>Heures réalisées</span><span className="text-white">{prof.heures}/{prof.total}h</span></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {deleteConfirm && (
        <Modal title="Confirmation" onClose={() => setDeleteConfirm(null)} maxWidth="max-w-md">
            <p className="text-gray-300 mb-6">Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
            <div className="flex justify-end gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-gray-600 hover:bg-white/5 transition font-bold text-gray-300">Annuler</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)]"><Trash2 size={16}/> Supprimer</button>
            </div>
        </Modal>
      )}

      {modalState.session && (
        <Modal title="Nouvelle Session" onClose={() => setModalState({...modalState, session: false})}>
          <form onSubmit={handleAddSession} className="space-y-4">
            <input name="formation" required placeholder="Nom de la formation" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 outline-none focus:border-[#5B4DFF] text-white transition"/>
            <div className="grid grid-cols-2 gap-4">
              <select name="categorie" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white outline-none"><option className="bg-[#161618]">Développement</option><option className="bg-[#161618]">Data & IA</option></select>
              <select name="type" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white outline-none"><option className="bg-[#161618]">Bootcamp</option><option className="bg-[#161618]">Alternance</option></select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="debut" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white [color-scheme:dark]"/>
              <input type="date" name="fin" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white [color-scheme:dark]"/>
            </div>
            <select name="prof" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white outline-none">{profs.map(p => <option key={p.id} value={p.nom} className="bg-[#161618]">{p.nom}</option>)}</select>
            <button className="w-full bg-[#5B4DFF] font-bold py-4 rounded-xl hover:bg-[#4c3df0] transition text-white shadow-[0_0_20px_rgba(91,77,255,0.4)] mt-2">Créer la session</button>
          </form>
        </Modal>
      )}

      {modalState.attendance && (
        <Modal title={!modalState.attendanceDate ? "Historique" : `Appel du ${modalState.attendanceDate}`} onClose={() => setModalState({...modalState, attendance: null, attendanceDate: null})} maxWidth="max-w-2xl">
            {!modalState.attendanceDate ? (
                <>
                    <p className="text-gray-400 mb-6">{modalState.attendance.formation} - Sélectionnez une date</p>
                    <div className="grid grid-cols-2 gap-4">
                        {["Aujourd'hui", "13 Octobre", "10 Octobre", "09 Octobre"].map((date, i) => (
                            <button key={i} onClick={() => setModalState({...modalState, attendanceDate: date})} className="flex justify-between items-center bg-[#0A0A0C] p-4 rounded-xl border border-[#1F1F23] hover:border-[#5B4DFF] hover:shadow-[0_0_15px_rgba(91,77,255,0.2)] transition group">
                                <span className="font-bold text-white">{date}</span>
                                <ChevronRight className="text-gray-600 group-hover:text-[#5B4DFF]"/>
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <button onClick={() => setModalState({...modalState, attendanceDate: null})} className="flex items-center gap-2 text-gray-400 mb-4 hover:text-white"><ChevronLeft size={16}/> Retour</button>
                    <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                        {students.map(s => {
                            const status = attendanceStatus[s.id];
                            const isEditing = editingAttendanceId === s.id;

                            return (
                                <div key={s.id} className="flex justify-between items-center bg-[#0A0A0C] p-4 rounded-xl border border-[#1F1F23]">
                                    <span className="font-bold text-white">{s.nom}</span>
                                    
                                    <div className="flex items-center gap-3">
                                        {!isEditing ? (
                                            <>
                                                {getStatusBadge(status)}
                                                <button onClick={() => setEditingAttendanceId(s.id)} className="p-1.5 rounded-lg bg-[#1F1F23] hover:bg-white/10 text-gray-400 hover:text-white transition"><Edit size={14}/></button>
                                            </>
                                        ) : (
                                            <div className="flex gap-2 bg-[#1F1F23] p-1 rounded-lg border border-white/5">
                                                <button onClick={() => setAttendanceStatus({...attendanceStatus, [s.id]: 'present'})} className={`px-3 py-1 rounded-md text-xs font-bold transition ${status === 'present' ? 'bg-[#163E2B] text-[#34D399]' : 'text-gray-500 hover:text-white'}`}>Présent</button>
                                                <button onClick={() => setAttendanceStatus({...attendanceStatus, [s.id]: 'retard'})} className={`px-3 py-1 rounded-md text-xs font-bold transition ${status === 'retard' ? 'bg-yellow-900/50 text-yellow-400' : 'text-gray-500 hover:text-white'}`}>Retard</button>
                                                <button onClick={() => setAttendanceStatus({...attendanceStatus, [s.id]: 'absent'})} className={`px-3 py-1 rounded-md text-xs font-bold transition ${status === 'absent' ? 'bg-red-900/50 text-red-400' : 'text-gray-500 hover:text-white'}`}>Absent</button>
                                                <button onClick={() => setEditingAttendanceId(null)} className="ml-1 text-[#34D399] hover:text-white"><Check size={16}/></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={() => setModalState({...modalState, attendance: null, attendanceDate: null})} className="mt-6 w-full bg-[#5B4DFF] text-white font-bold py-3 rounded-xl hover:bg-[#4c3df0] shadow-[0_0_20px_rgba(91,77,255,0.3)]">Terminer</button>
                </>
            )}
        </Modal>
      )}

      {modalState.event && (
        <Modal title="Ajouter au Planning" onClose={() => setModalState({...modalState, event: false})}>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <input name="titre" placeholder="Titre du cours" required className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 outline-none focus:border-[#5B4DFF] text-white transition"/>
            <input name="date" type="date" required className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white [color-scheme:dark]"/>
            <select name="prof" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white outline-none">{profs.map(p => <option key={p.id} value={p.nom} className="bg-[#161618]">{p.nom}</option>)}</select>
            <button className="w-full bg-[#5B4DFF] font-bold py-4 rounded-xl hover:bg-[#4c3df0] transition text-white shadow-[0_0_20px_rgba(91,77,255,0.4)]">Ajouter l'événement</button>
          </form>
        </Modal>
      )}

      {modalState.prof && (
        <Modal title={modalState.editProf ? "Modifier Intervenant" : "Nouveau Prof"} onClose={() => setModalState({...modalState, prof: false})}>
          <form key={modalState.editProf?.id || 'new'} onSubmit={handleSaveProf} className="space-y-4">
            <input name="nom" defaultValue={modalState.editProf?.nom} placeholder="Nom complet" required className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 outline-none focus:border-[#A78BFA] text-white transition"/>
            <input name="specialite" defaultValue={modalState.editProf?.specialite} placeholder="Spécialité" required className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 outline-none focus:border-[#A78BFA] text-white transition"/>
            <div className="grid grid-cols-2 gap-4">
              <input name="heures" type="number" defaultValue={modalState.editProf?.heures || 0} placeholder="Heures faites" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white outline-none"/>
              <input name="total" type="number" defaultValue={modalState.editProf?.total || 40} placeholder="Total contrat" className="w-full bg-black/50 border border-[#1F1F23] rounded-xl p-4 text-white outline-none"/>
            </div>
            <button className="w-full bg-[#A78BFA] font-bold py-4 rounded-xl hover:bg-[#9061F9] transition text-white shadow-[0_0_20px_rgba(167,139,250,0.4)]">Enregistrer</button>
          </form>
        </Modal>
      )}

      {modalState.student && (
        <Modal title={modalState.student.nom} onClose={() => setModalState({...modalState, student: null})}>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-[#34D399] mb-2 tracking-tight">{modalState.student.presence}%</div>
            <p className="text-gray-400 font-medium uppercase text-sm tracking-wider">Taux de présence global</p>
          </div>
          <div className="space-y-3">
            <div className="bg-[#0F0F11] p-4 rounded-xl border border-[#1F1F23] flex justify-between items-center"><span className="text-gray-400 flex items-center gap-3 font-medium"><Layers size={18} className="text-[#A78BFA]"/> Projets Rendus</span><span className="text-white font-bold text-lg">{modalState.student.projets} / 5</span></div>
            <div className="bg-[#0F0F11] p-4 rounded-xl border border-[#1F1F23] flex justify-between items-center"><span className="text-gray-400 flex items-center gap-3 font-medium"><TrendingUp size={18} className="text-[#60A5FA]"/> Participation</span><span className="text-[#60A5FA] font-bold">{modalState.student.participation}</span></div>
            <div className="bg-[#0F0F11] p-4 rounded-xl border border-[#1F1F23] flex justify-between items-center"><span className="text-gray-400 flex items-center gap-3 font-medium"><Award size={18} className="text-[#34D399]"/> Niveau</span><span className="text-white font-bold">{modalState.student.niveau}</span></div>
          </div>
        </Modal>
      )}

      {modalState.stats && (
        <Modal title="Statistiques Session" onClose={() => setModalState({...modalState, stats: null})}>
          <div className="text-center">
            <h3 className="text-xl font-bold text-[#A78BFA] mb-6">{modalState.stats.formation}</h3>
            <div className={`${intenseNeonBase} p-8 rounded-3xl mb-6 shadow-[0_0_30px_rgba(52,211,153,0.1)]`}>
                <div className="text-6xl font-bold text-[#34D399] mb-2 tracking-tight">{modalState.stats.presence}%</div>
                <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Participation Moyenne</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#0F0F11] border border-[#1F1F23] p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-white mb-1">4.8/5</div>
                    <div className="text-xs text-gray-400 font-bold uppercase">Satisfaction</div>
                 </div>
                 <div className="bg-[#0F0F11] border border-[#1F1F23] p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-white mb-1">12</div>
                    <div className="text-xs text-gray-400 font-bold uppercase">Projets</div>
                 </div>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default AdminDashboard;