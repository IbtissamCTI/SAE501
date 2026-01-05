import { useEffect } from "react"; 
import { Outlet, useLocation } from "react-router-dom";
import Header from "./component/Header";
import HeaderEleve from "./component/HeaderEleve";
import Footer from "./component/Footer";

function App() {
    const location = useLocation();
    const cheminActuel = location.pathname;

    // --- GESTION DU SCROLL AVEC ANCRE (#) ---
    useEffect(() => {
        // On vérifie si l'adresse contient un # (ex: #contact)
        if (location.hash) {
            // On récupère l'ID sans le # (ex: "contact")
            const idElement = location.hash.slice(1);
            const elementCible = document.getElementById(idElement);

            if (elementCible) {
                // Astuce : On attend 100ms pour être sûr que la page est bien chargée
                // sinon le scroll se lance parfois trop tôt et on reste en haut.
                setTimeout(() => {
                    elementCible.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } else {
            // Si pas d'ancre, on remonte tout en haut (comportement normal)
            window.scrollTo(0, 0);
        }
    }, [location]); // Se relance à chaque fois qu'on change de page ou de lien
    // ----------------------------------------

    // Logique pour cacher le header/footer sur certaines pages
    const estPageEleve = cheminActuel.startsWith("/eleve");
    
    const pagesPleinEcran = [
        "/connexion", 
        "/student", 
        "/intervenant", 
        "/admin"
    ];
    
    // On vérifie si on est sur l'une des pages plein écran
    const estPleinEcran = pagesPleinEcran.some(page => cheminActuel.startsWith(page));

    return (
        <>
            {/* Choix du Header */}
            {!estPleinEcran && (
                estPageEleve ? <HeaderEleve /> : <Header />
            )}

            <main>
                <Outlet />
            </main>

            {/* Footer affiché sauf sur dashboard et login */}
            {!estPleinEcran && !estPageEleve && <Footer />}
        </>
    );
}

export default App;