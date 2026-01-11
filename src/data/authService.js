const API_URL = 'http://localhost:8080/api/auth/';

export const login = async (pseudo, motDePasse) => {
    const credentials = btoa(`${pseudo}:${motDePasse}`);

    const response = await fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}` 
        },
        body: JSON.stringify({ pseudo, motDePasse }),
    });

    if (!response.ok) {
        throw new Error('Pseudo ou mot de passe incorrect.');
    }

    const data = await response.json();
    
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

