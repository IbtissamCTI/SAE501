package com.txlforma.api.model;

public class LoginRequest {
    private String pseudo;
    private String motDePasse;

    // Constructeur vide (nécessaire pour que Spring puisse créer l'objet)
    public LoginRequest() {}

    // Getters
    public String getPseudo() {
        return pseudo;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    // Setters
    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}