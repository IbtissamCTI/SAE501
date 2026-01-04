const API_URL = 'http://localhost:8080/api/auth/';

export const register = async (prenom, nom, email, motDePasse) => {
    const response = await fetch(API_URL + 'register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prenom,
            nom,
            email,
            motDePasse,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        try {
            // Le backend peut renvoyer une erreur au format JSON
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.message || 'Une erreur est survenue lors de l\'inscription.');
        } catch (e) {
            // Sinon, utiliser le texte brut de l'erreur
            throw new Error(errorText || 'Une erreur est survenue lors de l\'inscription.');
        }
    }

    // Pas de contenu attendu en cas de succès, juste un statut 200 OK ou 201 Created
    return {}; 
};

export const login = async (pseudo, motDePasse) => {
    const response = await fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pseudo,
            motDePasse,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.message || 'Pseudo ou mot de passe incorrect.');
        } catch (e) {
            throw new Error(errorText || 'Pseudo ou mot de passe incorrect.');
        }
    }

    const data = await response.json();
    if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }
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