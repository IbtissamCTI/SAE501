const API_URL = 'http://localhost:8080/api/auth/';

export const login = async (pseudo, motDePasse) => {
    // 1. Encodage des identifiants en Base64 pour le Basic Auth
    const credentials = btoa(`${pseudo}:${motDePasse}`);

    const response = await fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 2. Ajout du header obligatoire pour ton SecurityConfig
            'Authorization': `Basic ${credentials}` 
        },
        body: JSON.stringify({ pseudo, motDePasse }),
    });

    if (!response.ok) {
        throw new Error('Pseudo ou mot de passe incorrect.');
    }

    const data = await response.json();
    
    // 3. On stocke l'utilisateur ET les credentials pour les futurs appels (ex: PayPal)
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('authData', credentials); 
    
    return data;
};

export const register = async (prenom, nom, email, motDePasse, pseudo, role) => {
    const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, nom, email, motDePasse, pseudo, role }),
    });

    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Erreur lors de l'inscription");
    }
    return response.json();
};
export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authData');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

