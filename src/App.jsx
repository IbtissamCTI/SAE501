import { useEffect } from "react"; 
import { Outlet, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
    const location = useLocation();
    const cheminActuel = location.pathname;

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

    
    const pagesPleinEcran = [
        "/connexion", 
        "/inscription", 
        "/dashboard",   
        "/intervenant", 
        "/admin"        
    ];
    
    const estPleinEcran = pagesPleinEcran.some(page => cheminActuel.startsWith(page));

    return (
        <>
            {!estPleinEcran && <Header />}

            <main>
                <Outlet />
            </main>

            {!estPleinEcran && <Footer />}
        </>
    );
}

export default App;