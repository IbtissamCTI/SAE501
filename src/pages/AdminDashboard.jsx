import React, { useState, useEffect } from "react";
import { Users, BookOpen, Calendar, Plus, X, Edit, Trash2 } from "lucide-react";
import { 
    getIntervenants, getFormations, getSessions,
    createIntervenant, createFormation, createSession 
} from "../data/adminService.js";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("sessions");
  const [profs, setProfs] = useState([]);
  const [formations, setFormations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [modal, setModal] = useState({ type: null }); // 'prof', 'formation', 'session'

  // Chargement synchro avec le back
  useEffect(() => {
    const load = async () => {
      try {
        const [p, f, s] = await Promise.all([getIntervenants(), getFormations(), getSessions()]);
        setProfs(p || []);
        setFormations(f || []);
        setSessions(s || []);
      } catch (e) { console.error("Erreur API", e); }
    };
    load();
  }, []);

  // 1. Créer Intervenant
  const onAddProf = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      nom: fd.get("nom"), prenom: fd.get("prenom"),
      pseudo: fd.get("pseudo"), motDePasse: fd.get("mdp"),
      role: "INTERVENANT"
    };
    const res = await createIntervenant(payload);
    setProfs([...profs, res]);
    setModal({ type: null });
  };

  // 2. Créer Formation (avec Prix)
  const onAddFormation = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      titre: fd.get("titre"), categorie: fd.get("cat"),
      dureeHeures: parseInt(fd.get("duree")),
      prix: parseFloat(fd.get("prix"))
    };
    const res = await createFormation(payload);
    setFormations([...formations, res]);
    setModal({ type: null });
  };

  // 3. Créer Session (Attribution Formation + Intervenant + Détails)
  const onAddSession = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = {
      dateDebut: fd.get("debut"), dateFin: fd.get("fin"),
      lieu: fd.get("lieu"), salle: fd.get("salle"), horaires: fd.get("horaires"),
      formation: { id: parseInt(fd.get("fId")) },
      intervenant: { id: parseInt(fd.get("pId")) }
    };
    const res = await createSession(payload);
    setSessions([...sessions, res]);
    setModal({ type: null });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">ADMINISTRATION</h1>
            <p className="text-zinc-500 text-sm">Gestion du catalogue et des effectifs</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setModal({type:'prof'})} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-xs font-bold transition"> + INTERVENANT</button>
            <button onClick={() => setModal({type:'formation'})} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-xs font-bold transition"> + FORMATION</button>
            <button onClick={() => setModal({type:'session'})} className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg text-xs font-bold shadow-lg shadow-indigo-500/20 transition"> NOUVELLE SESSION</button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-8 mb-8 border-b border-zinc-800">
          {['sessions', 'formations', 'intervenants'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`pb-4 text-xs font-bold uppercase tracking-widest transition ${activeTab === t ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-zinc-500'}`}>{t}</button>
          ))}
        </div>

        {/* Tableaux de données */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-zinc-900/50 text-zinc-500">
              {activeTab === 'sessions' && <tr><th className="p-4">Formation</th><th className="p-4">Intervenant</th><th className="p-4">Lieu / Salle</th><th className="p-4">Dates</th></tr>}
              {activeTab === 'intervenants' && <tr><th className="p-4">Nom Complet</th><th className="p-4">Pseudo</th><th className="p-4">ID</th></tr>}
              {activeTab === 'formations' && <tr><th className="p-4">Titre</th><th className="p-4">Catégorie</th><th className="p-4">Prix</th><th className="p-4">Durée</th></tr>}
            </thead>
            <tbody>
              {activeTab === 'sessions' && sessions.map(s => (
                <tr key={s.id} className="border-t border-zinc-800/50 hover:bg-zinc-800/20">
                  <td className="p-4 font-bold text-indigo-400">{s.formation?.titre}</td>
                  <td className="p-4">{s.intervenant?.prenom} {s.intervenant?.nom}</td>
                  <td className="p-4 text-zinc-400">{s.lieu} - {s.salle} <br/><span className="text-xs">{s.horaires}</span></td>
                  <td className="p-4 text-xs font-mono">{s.dateDebut} / {s.dateFin}</td>
                </tr>
              ))}
              {activeTab === 'intervenants' && profs.map(p => (
                <tr key={p.id} className="border-t border-zinc-800/50">
                  <td className="p-4 font-bold">{p.prenom} {p.nom}</td>
                  <td className="p-4 text-zinc-400">{p.pseudo}</td>
                  <td className="p-4 text-zinc-600">#{p.id}</td>
                </tr>
              ))}
              {activeTab === 'formations' && formations.map(f => (
                <tr key={f.id} className="border-t border-zinc-800/50">
                  <td className="p-4 font-bold">{f.titre}</td>
                  <td className="p-4 text-zinc-400">{f.categorie}</td>
                  <td className="p-4 font-mono text-green-500">{f.prix}€</td>
                  <td className="p-4 text-zinc-500">{f.dureeHeures}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL UNIQUE */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-[#121214] border border-zinc-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold uppercase tracking-tighter">Ajouter {modal.type}</h2>
              <button onClick={() => setModal({type:null})}><X/></button>
            </div>

            {modal.type === 'prof' && (
              <form onSubmit={onAddProf} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <input name="prenom" placeholder="Prénom" className="bg-zinc-900 p-3 rounded-lg border border-zinc-800" required/>
                  <input name="nom" placeholder="Nom" className="bg-zinc-900 p-3 rounded-lg border border-zinc-800" required/>
                </div>
                <input name="pseudo" placeholder="Pseudo" className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-800" required/>
                <input name="mdp" type="password" placeholder="Mot de passe" className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-800" required/>
                <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg">CRÉER</button>
              </form>
            )}

            {modal.type === 'formation' && (
              <form onSubmit={onAddFormation} className="space-y-4">
                <input name="titre" placeholder="Titre de la formation" className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-800" required/>
                <div className="grid grid-cols-3 gap-2">
                  <input name="cat" placeholder="Cat." className="bg-zinc-900 p-3 rounded-lg border border-zinc-800"/>
                  <input name="duree" type="number" placeholder="Heures" className="bg-zinc-900 p-3 rounded-lg border border-zinc-800"/>
                  <input name="prix" type="number" step="0.01" placeholder="Prix €" className="bg-zinc-900 p-3 rounded-lg border border-zinc-800" required/>
                </div>
                <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg">AJOUTER AU CATALOGUE</button>
              </form>
            )}

            {modal.type === 'session' && (
              <form onSubmit={onAddSession} className="space-y-3">
                <select name="fId" className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-800" required>
                  <option value="">Sélectionner Formation</option>
                  {formations.map(f => <option key={f.id} value={f.id}>{f.titre}</option>)}
                </select>
                <select name="pId" className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-800" required>
                  <option value="">Attribuer Intervenant</option>
                  {profs.map(p => <option key={p.id} value={p.id}>{p.prenom} {p.nom}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input name="debut" type="date" className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-xs" required/>
                  <input name="fin" type="date" className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-xs" required/>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input name="lieu" placeholder="Lieu" className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-xs" required/>
                  <input name="salle" placeholder="Salle" className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-xs" required/>
                </div>
                <input name="horaires" placeholder="Ex: 09:00 - 17:00" className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-xs" required/>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg mt-4">PLANIFIER LA SESSION</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};//bl  lblznjdbzhdizaojduozabyizahuodozadbzehfdbyhbyie

export default AdminDashboard;