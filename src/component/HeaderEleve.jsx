import React from "react";
import { Link } from "react-router-dom";
import { School, Bell, User } from "lucide-react";

function HeaderEleve() {
	return (
		<nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4">
			<div className="mx-auto px-6 flex justify-between items-center">
				<div className="flex items-center gap-2.5 font-bold text-2xl tracking-tighter text-white">
					<div className="bg-indigo-600 p-1.5 rounded-lg">
						<School className="h-5 w-5 text-white" fill="currentColor" />
					</div>
					<span>Novatio (Espace Éleve)</span>
				</div>

				<div className="hidden md:flex space-x-8 items-center font-medium text-sm text-slate-300">
					<Link to="/eleve" className="hover:text-white transition-colors">
						Tableau de bord
					</Link>
					<Link to="/eleve/cours" className="hover:text-white transition-colors">
						Mes Cours
					</Link>
					<Link to="/eleve/profil" className="hover:text-white transition-colors">
						Mon Profil
					</Link>
				</div>

                <div className="flex items-center gap-4">
                    <button className="text-slate-400 hover:text-white">
                        <Bell size={20} />
                    </button>
                    <button className="text-slate-400 hover:text-white">
                        <User size={20} />
                    </button>
                </div>
			</div>
		</nav>
	);
}

export default HeaderEleve;
