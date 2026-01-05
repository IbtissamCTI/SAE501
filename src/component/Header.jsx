import { useState, useEffect } from "react";
import { School } from "lucide-react";
import { Link } from "react-router-dom"; 

function Header() {
    // Gestion du fond du menu au scroll
    const [aDefile, setADefile] = useState(false);

    useEffect(() => {
        const detecterScroll = () => {
            // Si on descend de plus de 20px, on change le fond
            setADefile(window.scrollY > 20);
        };
        window.addEventListener("scroll", detecterScroll);
        
        // Nettoyage de l'écouteur quand on quitte
        return () => window.removeEventListener("scroll", detecterScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${
            aDefile ? "bg-slate-950/80 backdrop-blur-md border-slate-800 py-4" : "bg-transparent py-6"
        }`}>
            <div className="mx-auto px-6 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 font-bold text-2xl tracking-tighter text-white cursor-pointer hover:text-indigo-400 transition-colors">
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <School className="h-5 w-5 text-white" fill="currentColor" />
                    </div>
                    <span>Novatio</span>
                </Link>

                {/* Menu Ordi */}
                <div className="hidden md:flex space-x-8 items-center font-medium text-sm text-slate-300">
                    <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
                    <Link to="/formation" className="hover:text-white transition-colors">Formation</Link>
                    
                    {/* Le lien magique qui marche maintenant partout */}
                    <Link 
                        to="/#contact" 
                        className="hover:text-white transition-colors cursor-pointer"
                    >
                        Nous Contacter
                    </Link>

                    <Link to="/connexion" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold">
                        Commencer
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Header;