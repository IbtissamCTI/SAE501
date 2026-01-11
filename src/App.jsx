import { useEffect } from "react"; 
import { Outlet, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
    const location = useLocation();
    const cheminActuel = location.pathname;

    // Gestion du Scroll automatique
    useEffect(() => {
        if (location.hash) {
            const idElement = location.hash.slice(1);
            const elementCible = document.getElementById(idElement);
            if (elementCible) {
                setTimeout(() => {
                    elementCible.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    // --- LOGIQUE D'AFFICHAGE ---
    
    // Liste des pages "Plein écran" (Sans Header/Footer global)
    const pagesPleinEcran = [
        "/connexion", 
        "/inscription", 
        "/dashboard",   // Apprenti
        "/intervenant", // Prof
        "/admin"        // Admin
    ];
    
    const estPleinEcran = pagesPleinEcran.some(page => cheminActuel.startsWith(page));

    return (
        <>
            {/* On cache le Header sur les dashboards et le login */}
            {!estPleinEcran && <Header />}

            <main>
                {/* C'est ici que s'affichent les pages du Router */}
                <Outlet />
            </main>

            {/* On cache le Footer sur les dashboards et le login */}
            {!estPleinEcran && <Footer />}
        </>
    );
}

export default App;