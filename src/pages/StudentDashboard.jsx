import React, { useState, useEffect } from "react";
import {
    Calendar, Clock, CheckCircle, FileText, User, Download, Play, Trophy,
    TrendingUp, ArrowRight, MessageSquare, Send, Paperclip, Grid, List,
    Search, MoreVertical, PenTool, Award, LogOut, BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- STYLES ---
const styles = {
    card: "bg-[#0A0A0C] border border-[#1F1F23] rounded-3xl p-6 shadow-lg hover:shadow-xl hover:shadow-[#5B4DFF]/5 transition-all duration-300",
    buttonPrimary: "bg-white text-[#5B4DFF] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition shadow-lg active:scale-95",
    buttonAction: "w-full bg-[#34D399] text-[#050507] font-bold py-3 rounded-xl hover:bg-[#2dbd89] transition flex justify-center items-center gap-2 active:scale-95",
    inputField: "flex-1 bg-[#1F1F23] text-white px-4 py-3 rounded-xl outline-none focus:ring-1 focus:ring-[#5B4DFF] transition",
    tabButton: (isActive) => `pb-3 font-bold capitalize transition whitespace-nowrap ${isActive ? "text-[#5B4DFF] border-b-2 border-[#5B4DFF]" : "text-gray-500 hover:text-white"}`,
};

// --- UTILITAIRES ---
const getSessionStatus = (dateSession) => {
    const now = new Date();
    const sessionDate = new Date(dateSession);
    const isToday = sessionDate.toDateString() === now.toDateString();
    
    if (isToday) return { label: "En cours", style: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" };
    if (sessionDate < now) return { label: "Terminé", style: "bg-green-500/10 text-green-500 border-green-500/20" };
    return { label: "À venir", style: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
};

const Notification = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#0A0A0C] border border-[#34D399]/30 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
                <div className="w-16 h-16 bg-[#34D399]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#34D399]"><CheckCircle size={32} strokeWidth={1.5} /></div>
                <h3 className="text-xl font-bold text-white mb-2">Parfait !</h3>
                <p className="text-gray-400 mb-6">{message}</p>
                <button onClick={onClose} className="w-full bg-[#34D399] hover:bg-[#2dbd89] text-[#050507] font-bold py-3 rounded-xl transition">Fermer</button>
            </div>
        </div>
    );
};

const CustomBarChart = ({ data }) => {
    const maxVal = Math.max(...data.map((d) => d.value));
    return (
        <div className="w-full h-48 flex items-end justify-between gap-2 pt-6 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                {[...Array(4)].map((_, i) => <div key={i} className="w-full h-[1px] bg-gray-500"></div>)}
            </div>
            {data.map((item, index) => {
                const heightPct = (item.value / maxVal) * 100;
                return (
                    <div key={index} className="h-full flex-1 flex flex-col justify-end group relative">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F1F23] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition border border-[#5B4DFF]">
                            {item.value}h
                        </div>
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-[#5B4DFF]/50 to-[#5B4DFF] hover:from-[#34D399]/50 hover:to-[#34D399] transition-all duration-300 relative" style={{ height: `${heightPct}%` }}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
                        </div>
                        <span className="text-[10px] text-gray-500 text-center mt-2 font-medium uppercase tracking-wide">{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

// --- COMPOSANTS VUES ---
const VueDashboard = ({ nextSession, handleEmargement, hasSigned, triggerNotification, navigateTab, upcomingSessions, history, lastResult, chartData, studentInfo }) => {
    const now = new Date();
    const displayUpcoming = upcomingSessions.filter(s => new Date(s.fullDate) >= now).slice(0, 3);
    const displayHistory = history.filter(s => new Date(s.fullDate) < now).slice(0, 3);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
            <div className="lg:col-span-2 space-y-8">
                {nextSession ? (
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5B4DFF] to-[#2D1B4E] p-8 shadow-2xl shadow-[#5B4DFF]/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2"><span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm animate-pulse">● {nextSession.statusInfo.label}</span></div>
                                <h2 className="text-3xl font-bold text-white mb-2">{nextSession.title}</h2>
                                <p className="text-white/80 mb-6 max-w-md">Rappel : L'émargement est ouvert 15 min avant le début.</p>
                                <div className="flex flex-wrap gap-3">
                                    <button onClick={handleEmargement} disabled={hasSigned} className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition shadow-lg ${hasSigned ? "bg-[#34D399] text-[#050507] cursor-default" : "bg-[#0A0A0C] text-white border border-[#5B4DFF] hover:bg-[#1F1F23]"}`}>{hasSigned ? <CheckCircle size={18} /> : <PenTool size={18} />}{hasSigned ? "Présence Validée" : "Émarger le cours"}</button>
                                    <button onClick={() => triggerNotification("Lancement de Zoom...")} className={styles.buttonPrimary}><Play size={18} fill="currentColor" /> Rejoindre</button>
                                </div>
                            </div>
                            <div className="bg-black/30 backdrop-blur-md p-4 rounded-2xl border border-white/10 min-w-[200px]">
                                <div className="flex items-center gap-3 mb-3"><Calendar size={18} className="text-[#A78BFA]" /> <span className="font-bold">{nextSession.date}</span></div>
                                <div className="flex items-center gap-3 mb-3"><Clock size={18} className="text-[#A78BFA]" /> <span className="font-bold">{nextSession.time}</span></div>
                                <div className="flex items-center gap-3"><User size={18} className="text-[#A78BFA]" /> <span className="text-sm text-gray-300">Avec {nextSession.trainer}</span></div>
                            </div>
                        </div>
                    </div>
                ) : (<div className="p-8 rounded-3xl bg-[#1F1F23] border border-[#5B4DFF]/30 text-center"><h3 className="text-xl font-bold text-white mb-2">Aucune session à venir</h3><p className="text-gray-400">Votre emploi du temps est libre.</p></div>)}

                <div>
                    <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-white">Prochainement</h3><button onClick={() => navigateTab("planning")} className="p-2 rounded-full bg-[#1F1F23] hover:bg-[#5B4DFF] transition text-white"><ArrowRight size={16} /></button></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {displayUpcoming.length > 0 ? displayUpcoming.map((session) => (
                            <div key={session.id} className={`${styles.card} group cursor-pointer hover:border-[#5B4DFF]/50`}>
                                <div className="h-20 bg-[#1F1F23] rounded-xl mb-4 flex items-center justify-center text-gray-600 group-hover:text-[#5B4DFF] transition"><FileText size={28} /></div>
                                <h4 className="font-bold text-white text-sm truncate">{session.title}</h4>
                                <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 bg-[#1F1F23] w-fit px-2 py-1 rounded"><Calendar size={10} /> {session.date}</div>
                                <div className={`mt-2 text-xs font-bold px-2 py-0.5 rounded w-fit border ${session.statusInfo.style.replace("text-", "text-xs ")}`}>{session.statusInfo.label}</div>
                            </div>
                        )) : <p className="text-gray-500 italic text-sm">Rien de prévu prochainement.</p>}
                    </div>
                </div>

                <div className={styles.card}>
                    <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-white">Historique récent</h3><button onClick={() => navigateTab("history")} className="text-xs text-gray-500 hover:text-white transition underline">Voir tout</button></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left"><thead className="text-xs text-gray-500 uppercase font-bold border-b border-[#1F1F23]"><tr><th className="pb-4 pl-2">Session</th><th className="pb-4 text-center">Statut</th><th className="pb-4 text-center">Note</th><th className="pb-4 text-right pr-2">Date</th></tr></thead><tbody className="text-sm">
                            {displayHistory.length > 0 ? displayHistory.map((item) => (<tr key={item.id} className="border-b border-[#1F1F23] last:border-0 hover:bg-[#1F1F23]/30 transition group"><td className="py-4 pl-2 font-bold text-white group-hover:text-[#5B4DFF] transition">{item.title}</td><td className="py-4 text-center"><span className={`px-2 py-1 rounded text-xs font-bold border ${item.statusInfo.style}`}>{item.statusInfo.label}</span></td><td className="py-4 text-center text-gray-400">{item.note ? item.note + "/20" : "-"}</td><td className="py-4 text-right pr-2 text-gray-500">{item.date}</td></tr>)) : <tr><td colSpan="4" className="py-4 text-center text-gray-500">Aucun historique récent.</td></tr>}
                        </tbody></table>
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                <div className={`${styles.card} relative overflow-hidden`}><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#34D399] to-[#5B4DFF]"></div><h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Trophy size={20} className="text-[#34D399]" /> Derniers résultats</h3><div className="flex flex-col items-center mb-6"><div className="w-32 h-32 rounded-full border-4 border-[#1F1F23] relative flex items-center justify-center bg-[#050507] shadow-[0_0_30px_rgba(52,211,153,0.1)]"><div className="text-center"><span className="text-4xl font-bold text-white">{lastResult.score}</span><span className="text-sm text-gray-500 block font-bold">/ {lastResult.total}</span></div></div></div><div className="text-center mb-6"><p className="text-sm text-gray-300 font-medium mb-1">{lastResult.module}</p><p className="text-xs text-[#34D399] bg-[#34D399]/10 py-1 px-2 rounded inline-block border border-[#34D399]/20">{lastResult.feedback}</p></div><button onClick={() => triggerNotification("Téléchargement...")} className={styles.buttonAction}><Download size={18} /> Attestation</button></div>
                <div className={styles.card}><h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><TrendingUp size={20} className="text-[#5B4DFF]" /> Activité Hebdo</h3><CustomBarChart data={chartData} /></div>
            </div>
        </div>
    );
};

const VuePlanning = ({ showCalendar, setShowCalendar, upcomingSessions }) => (<div className="animate-in fade-in"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-white">Mon Planning (Tout)</h2><button onClick={() => setShowCalendar(!showCalendar)} className="flex items-center gap-2 bg-[#1F1F23] px-4 py-2 rounded-xl text-sm font-bold text-[#A78BFA] hover:text-white transition border border-[#1F1F23] hover:border-[#5B4DFF]">{showCalendar ? <><List size={16} /> Vue Liste</> : <><Grid size={16} /> Vue Calendrier</>}</button></div>{showCalendar ? (<div className={styles.card}><div className="grid grid-cols-7 gap-4 mb-4 text-center text-gray-500 font-bold uppercase text-xs"><div>Lun</div><div>Mar</div><div>Mer</div><div>Jeu</div><div>Ven</div><div>Sam</div><div>Dim</div></div><div className="grid grid-cols-7 gap-4">{Array.from({ length: 31 }, (_, i) => { const day = i + 1; const session = upcomingSessions.find(s => s.day === day); return (<div key={day} className={`min-h-[100px] p-3 rounded-2xl border ${session ? "bg-[#2D1B4E]/50 border-[#5B4DFF]/50 shadow-[inset_0_0_20px_rgba(91,77,255,0.1)]" : "bg-[#1F1F23]/50 border-transparent"} relative group transition-all hover:bg-[#1F1F23]`}> <span className={`text-sm font-bold ${session ? "text-white" : "text-gray-600"}`}>{day}</span>{session && (<div className="mt-2"><div className="text-[10px] font-bold text-[#A78BFA] bg-[#2D1B4E] px-1.5 py-0.5 rounded w-fit mb-1">{session.time}</div><div className="text-xs font-bold text-white leading-tight truncate">{session.title}</div></div>)}</div>); })}</div></div>) : (<div className="grid gap-4">{upcomingSessions.map((session) => (<div key={session.id} className={`${styles.card} flex justify-between items-center hover:border-[#5B4DFF]/50`}><div className="flex items-center gap-4"><div className="bg-[#1F1F23] p-3 rounded-xl text-[#5B4DFF]"><Calendar size={24} /></div><div><h4 className="font-bold text-white text-lg">{session.title}</h4><p className="text-gray-400 text-sm flex items-center gap-2"><Clock size={14} /> {session.date} • {session.time}</p></div></div><div className="text-right"><span className={`text-sm font-bold px-3 py-1 rounded-lg border ${session.statusInfo.style}`}>{session.statusInfo.label}</span></div></div>))}</div>)}</div>);
const VueHistory = ({ history }) => (<div className="animate-in fade-in"><h2 className="text-2xl font-bold text-white mb-6">Historique complet</h2><div className={`${styles.card} p-0 overflow-hidden`}><table className="w-full text-left"><thead className="bg-[#18181b] text-gray-400 text-xs uppercase font-bold"><tr><th className="p-4">Session</th><th className="p-4 text-center">Statut</th><th className="p-4 text-center">Note</th><th className="p-4 text-center">Certificat</th><th className="p-4">Formateur</th><th className="p-4 text-right">Date</th></tr></thead><tbody className="divide-y divide-[#1F1F23]">{history.map((item) => (<tr key={item.id} className="hover:bg-[#1F1F23]/50 transition"><td className="p-4 font-bold text-white">{item.title}</td><td className="p-4 text-center"><span className={`px-2 py-1 rounded text-xs font-bold border ${item.statusInfo.style}`}>{item.statusInfo.label}</span></td><td className="p-4 text-center"><span className={`px-2 py-1 rounded text-xs font-bold border ${ (item.note || 0) >= 10 ? "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/20" : "bg-red-500/10 text-red-500 border-red-500/20" }`}>{item.note !== undefined ? item.note + "/20" : "-"}</span></td><td className="p-4 text-center">{(item.note || 0) >= 10 ? (<button className="text-[#5B4DFF] hover:text-white transition flex items-center justify-center gap-1 mx-auto text-xs font-bold bg-[#5B4DFF]/10 hover:bg-[#5B4DFF] px-3 py-1 rounded-lg" onClick={() => alert(`Téléchargement du certificat...`)}><Award size={14} /> PDF</button>) : <span className="text-gray-600 text-xs italic">-</span>}</td><td className="p-4 text-gray-400">{item.trainer}</td><td className="p-4 text-right text-gray-500">{item.date}</td></tr>))}</tbody></table></div></div>);
const VueMessages = ({ contacts, selectedContact, setSelectedContact, messageInput, setMessageInput, handleSendMessage, triggerNotification }) => (<div className="animate-in fade-in h-[600px] flex gap-6"><div className={`${styles.card} w-1/3 flex flex-col p-0 overflow-hidden`}><div className="p-6 border-b border-[#1F1F23]"><h3 className="text-xl font-bold text-white mb-4">Messages</h3><div className="relative"><Search size={16} className="absolute left-3 top-3 text-gray-500" /><input type="text" placeholder="Rechercher..." className={styles.inputField + " pl-10"} /></div></div><div className="flex-1 overflow-y-auto">{contacts.map((contact) => (<div key={contact.id} onClick={() => setSelectedContact(contact.id)} className={`p-4 flex items-center gap-4 cursor-pointer transition hover:bg-[#1F1F23] ${selectedContact === contact.id ? "bg-[#1F1F23] border-l-2 border-[#5B4DFF]" : ""}`}><div className="relative"><div className="w-10 h-10 rounded-full bg-[#2D1B4E] flex items-center justify-center text-[#A78BFA] font-bold">{contact.name.charAt(0)}</div>{contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#34D399] rounded-full border-2 border-[#0A0A0C]"></div>}</div><div><h4 className="font-bold text-white text-sm">{contact.name}</h4><p className="text-xs text-gray-500">{contact.role}</p></div></div>))}</div></div><div className={`${styles.card} flex-1 flex flex-col p-0 overflow-hidden`}><div className="p-4 border-b border-[#1F1F23] flex justify-between items-center bg-[#0F0F11]"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-[#2D1B4E] flex items-center justify-center text-[#A78BFA] font-bold">{activeConv.name.charAt(0)}</div><div><h4 className="font-bold text-white text-sm">{activeConv.name}</h4><p className="text-xs text-green-500">{activeConv.online ? "En ligne" : "Absent"}</p></div></div><button className="text-gray-500 hover:text-white"><MoreVertical size={20} /></button></div><div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#0A0A0C]"><div className="text-center text-xs text-gray-600 my-4">Aujourd'hui</div>{activeConv.messages.length > 0 ? activeConv.messages.map((msg) => (<div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}><div className={`max-w-[70%] p-4 rounded-2xl text-sm ${msg.sender === "me" ? "bg-[#5B4DFF] text-white rounded-br-none" : "bg-[#1F1F23] text-gray-300 rounded-bl-none"}`}><p>{msg.text}</p><span className="text-[10px] opacity-50 block text-right mt-1">{msg.time}</span></div></div>)) : <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50"><MessageSquare size={48} className="mb-2" /><p>Démarrez la conversation</p></div>}</div><form onSubmit={handleSendMessage} className="p-4 border-t border-[#1F1F23] bg-[#0F0F11] flex items-center gap-3"><button type="button" onClick={() => triggerNotification("Fichier joint")} className="p-2 text-gray-500 hover:text-[#5B4DFF]"><Paperclip size={20} /></button><input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Écrivez votre message..." className={styles.inputField} /><button type="submit" className="p-3 bg-[#5B4DFF] text-white rounded-xl hover:bg-[#4c3df0] shadow-lg"><Send size={18} /></button></form></div></div>);

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [notification, setNotification] = useState(null);
    const [hasSigned, setHasSigned] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedContact, setSelectedContact] = useState(1);
    const [messageInput, setMessageInput] = useState("");
    const navigate = useNavigate();

    const [studentInfo, setStudentInfo] = useState({ name: "Apprenti", level: "Niveau 4 - Expert", avatar: "A" });
    const [nextSession, setNextSession] = useState(null);
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [history, setHistory] = useState([]);

    // ✅ CETTE LIGNE ETAIT MANQUANTE ET CAUSAIT LE CRASH
    const triggerNotification = (msg) => setNotification(msg);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/connexion');
    };

    const goToCatalogue = () => {
        navigate('/formations'); // Correction pluriel
    };

    useEffect(() => {
        const loadData = async () => {
            const userStr = localStorage.getItem("user");
            if (!userStr) { navigate('/connexion'); return; }
            
            let user = {};
            try { user = JSON.parse(userStr); } catch (e) { console.error(e); }
            
            setStudentInfo({
                name: `${user.prenom || "Apprenti"} ${user.nom || ""}`.trim(),
                level: "Niveau 4 - Expert",
                avatar: (user.prenom || "A").charAt(0).toUpperCase()
            });

            const authData = localStorage.getItem("authData");
            const userId = user.id || user.idUser || user.id_user;
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:8080/api/sessions/mes-sessions?idApprenti=${userId}`, {
                    headers: { "Authorization": `Basic ${authData}` }
                });

                if (response.ok) {
                    const sessions = await response.json();
                    const now = new Date();
                    const allFormattedSessions = [];

                    sessions.forEach(session => {
                        const sessDate = new Date(session.dateDebut);
                        const formattedDate = sessDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
                        const formattedTime = sessDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                        
                        const statusInfo = getSessionStatus(session.dateDebut);

                        allFormattedSessions.push({
                            id: session.id,
                            title: session.formation?.titre || "Session",
                            date: formattedDate,
                            time: formattedTime,
                            trainer: session.intervenant ? `${session.intervenant.prenom} ${session.intervenant.nom}` : "Non assigné",
                            day: sessDate.getDate(),
                            fullDate: sessDate,
                            statusInfo: statusInfo,
                            note: sessDate < now ? Math.floor(Math.random() * (20 - 10 + 1)) + 10 : undefined
                        });
                    });

                    const futures = allFormattedSessions.filter(s => new Date(s.fullDate) >= now);
                    futures.sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));
                    setNextSession(futures.length > 0 ? futures[0] : null);

                    const chronologic = [...allFormattedSessions].sort((a, b) => new Date(a.fullDate) - new Date(b.fullDate));
                    setUpcomingSessions(chronologic);

                    const antiChronologic = [...allFormattedSessions].sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate));
                    setHistory(antiChronologic);
                }
            } catch (error) { console.error("Erreur chargement:", error); }
        };
        loadData();
    }, [navigate]);

    const lastResult = { module: "Architecture Node.js", score: 16, total: 20, feedback: "Bravo ! Session validée." };
    const chartData = [ { label: "Lun", value: 4 }, { label: "Mar", value: 7 }, { label: "Mer", value: 3 }, { label: "Jeu", value: 8 }, { label: "Ven", value: 5 }, { label: "Sam", value: 9 }, { label: "Dim", value: 2 } ];
    const contacts = [ { id: 1, name: "Administration", role: "Scolarité", online: true, messages: [ { id: 1, text: "Bonjour, votre dossier est complet.", sender: "other", time: "10:00" }, { id: 2, text: "Merci !", sender: "me", time: "10:05" } ] }, { id: 2, name: "Don Dada", role: "Formateur React", online: false, messages: [] } ];

    const handleEmargement = () => { setHasSigned(true); triggerNotification("Votre présence a bien été enregistrée."); };
    const handleSendMessage = (e) => { e.preventDefault(); if (messageInput.trim() === "") return; triggerNotification("Message envoyé !"); setMessageInput(""); };

    return (
        <div className="min-h-screen bg-[#050507] text-white p-6 md:p-10 font-sans pb-20">
            <div className="flex justify-between items-center mb-10">
                <div><h1 className="text-4xl font-bold text-white mb-2">Mon Espace</h1><p className="text-gray-400">Heureux de vous revoir, <span className="text-[#5B4DFF]">{studentInfo.name}</span>.</p></div>
                <div className="flex items-center gap-4">
                    <button onClick={goToCatalogue} className="hidden md:flex items-center gap-2 bg-[#1F1F23] hover:bg-[#5B4DFF] hover:text-white px-4 py-2 rounded-xl text-sm font-bold text-gray-400 transition border border-[#1F1F23]"><BookOpen size={16} /> Catalogue Formations</button>
                    <span className="hidden md:block text-xs font-bold text-[#34D399] bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#34D399]/20 animate-pulse">● Connecté</span>
                    <div className="w-12 h-12 bg-[#0A0A0C] rounded-full flex items-center justify-center font-bold text-xl border border-[#1F1F23] text-white shadow-lg">{studentInfo.avatar}</div>
                    <button onClick={handleLogout} className="p-3 bg-[#1F1F23] rounded-full hover:bg-red-500/20 hover:text-red-500 transition border border-[#1F1F23]"><LogOut size={20} /></button>
                </div>
            </div>
            <div className="flex gap-6 mb-8 border-b border-[#1F1F23] pb-1 overflow-x-auto">
                {["dashboard", "planning", "history", "messages"].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={styles.tabButton(activeTab === tab)}>{tab === "history" ? "Historique" : tab === "messages" ? "Messagerie" : tab}</button>
                ))}
            </div>
            <div className="min-h-[400px]">
                {activeTab === "dashboard" && <VueDashboard nextSession={nextSession} handleEmargement={handleEmargement} hasSigned={hasSigned} triggerNotification={triggerNotification} navigateTab={setActiveTab} upcomingSessions={upcomingSessions} history={history} lastResult={lastResult} chartData={chartData} studentInfo={studentInfo} />}
                {activeTab === "planning" && <VuePlanning showCalendar={showCalendar} setShowCalendar={setShowCalendar} upcomingSessions={upcomingSessions} />}
                {activeTab === "history" && <VueHistory history={history} />}
                {activeTab === "messages" && <VueMessages contacts={contacts} selectedContact={selectedContact} setSelectedContact={setSelectedContact} messageInput={messageInput} setMessageInput={setMessageInput} handleSendMessage={handleSendMessage} triggerNotification={triggerNotification} />}
            </div>
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
        </div>
    );
};

export default StudentDashboard;