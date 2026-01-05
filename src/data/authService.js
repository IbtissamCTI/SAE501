const API_AUTH = 'http://localhost:8080/api/auth/';
const API_BASE = 'http://localhost:8080/api/';

// ==========================================
// 1. AUTHENTIFICATION & COMPTES
// ==========================================

export const register = async (prenom, nom, email, motDePasse) => {
    const response = await fetch(API_AUTH + 'register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, nom, email, motDePasse }),
    });
    if (!response.ok) throw new Error('Erreur lors de l\'inscription');
    return response.json();
};

export const login = async (pseudo, motDePasse) => {
    const response = await fetch(API_AUTH + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo, motDePasse }),
    });
    if (!response.ok) throw new Error('Pseudo ou mot de passe incorrect.');
    const data = await response.json();
    // Sauvegarde de l'utilisateur (id, pseudo, role) pour rester connecté
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        return null;
    }
};

// ==========================================
// 2. FORMATIONS & SESSIONS
// ==========================================

// Liste les technos par catégorie (Étape 2 de ton design)
export const getFormationsByCategorie = async (categorie) => {
    const response = await fetch(`${API_BASE}formations/categorie/${categorie}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération");
    return response.json();
};

// Détails d'une techno + liste des sessions (Étape 3 de ton design)
export const getFormationDetails = async (id) => {
    const response = await fetch(`${API_BASE}formations/${id}`);
    if (!response.ok) throw new Error("Formation introuvable");
    return response.json();
};

// ==========================================
// 3. RÉSULTATS & CERTIFICATIONS
// ==========================================

// Pour que l'intervenant note un élève (Règle du 10/20)
export const noterEleve = async (idSession, idApprenti, note, appreciation) => {
    const response = await fetch(`${API_BASE}resultats/noter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idSession, idApprenti, note, appreciation }),
    });
    if (!response.ok) throw new Error("Erreur lors de la notation");
    return response.json();
};

// Pour que l'élève télécharge son certificat (Si note >= 10)
export const getCertificatURL = (idResultat) => {
    return `${API_BASE}resultats/certification/${idResultat}`;
};

// ==========================================
// 4. PAIEMENT & INSCRIPTION
// ==========================================

export const startStripePayment = async (idSession, idApprenti) => {
    const response = await fetch(`${API_BASE}paiement/creer-session?idSession=${idSession}&idApprenti=${idApprenti}`, {
        method: 'POST'
    });
    if (!response.ok) throw new Error("Erreur Stripe : Impossible de générer la session de paiement.");
    const checkoutUrl = await response.text();
    // Redirige l'utilisateur vers la page sécurisée de Stripe
    window.location.href = checkoutUrl; 
};