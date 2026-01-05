package com.txlforma.api.model;

import jakarta.persistence.*;

@Entity
public class Apprentie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    private String nom;
    private String prenom;
    private String email;

    // ============================================
    // CONSTRUCTEURS (Obligatoire pour JPA)
    // ============================================

    public Apprentie() {
    }

    public Apprentie(Long idUser, String nom, String prenom, String email) {
        this.idUser = idUser;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
    }

    // ============================================
    // GETTERS ET SETTERS (Remplace Lombok)
    // ============================================

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}