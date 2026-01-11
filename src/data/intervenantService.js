const API_URL = 'http://localhost:8080/api/intervenant';

const getAuthHeaders = () => {
    const authData = localStorage.getItem('authData');
    if (!authData) throw new Error("Non connecté");
    return {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authData}`
    };
};

export const getIntervenantProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) throw new Error("Utilisateur non connecté");
    return user;
};

export const getIntervenantSessions = async () => {
    try {
        const response = await fetch(`${API_URL}/sessions`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur sessions");
        return await response.json();
    } catch (error) {
        console.error("Sessions:", error);
        return []; 
    }
};

export const getIntervenantPlanning = async () => {
    try {
        const response = await fetch(`${API_URL}/planning`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Erreur planning");
        return await response.json();
    } catch (error) {
        console.error("Planning:", error);
        return [];
    }
};

export const updateIntervenantProfile = async (profileData) => {
    const response = await fetch(`${API_URL}/profil`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
    });
    if (!response.ok) throw new Error("Erreur mise à jour");
    return await response.json();
};