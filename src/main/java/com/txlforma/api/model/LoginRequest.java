package com.txlforma.api.model;

public class LoginRequest {
    private String pseudo;
    private String motDePasse;

    public LoginRequest() {}


    public String getPseudo() {
        return pseudo;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}