const API_URL = "http://localhost:8080/api/admin";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Basic ${localStorage.getItem('authData')}`
});

export const getIntervenants = async () => {
    const response = await fetch(`${API_URL}/intervenants`, { headers: getHeaders() });
    return await response.json();
};

export const getFormations = async () => {
    const response = await fetch(`${API_URL}/formations`, { headers: getHeaders() });
    return await response.json();
};

export const getSessions = async () => {
    const response = await fetch(`${API_URL}/sessions`, { headers: getHeaders() });
    return await response.json();
};

export const createIntervenant = async (u) => {
    const response = await fetch(`${API_URL}/intervenants`, {
        method: "POST", headers: getHeaders(), body: JSON.stringify(u)
    });
    return await response.json();
};

export const createFormation = async (f) => {
    const response = await fetch(`${API_URL}/formations`, {
        method: "POST", headers: getHeaders(), body: JSON.stringify(f)
    });
    return await response.json();
};

export const createSession = async (s) => {
    const response = await fetch(`${API_URL}/sessions`, {
        method: "POST", headers: getHeaders(), body: JSON.stringify(s)
    });
    return await response.json();
};

export const updateSession = async (id, s) => {
    const response = await fetch(`${API_URL}/sessions/${id}`, {
        method: "PUT", headers: getHeaders(), body: JSON.stringify(s)
    });
    return await response.json();
};