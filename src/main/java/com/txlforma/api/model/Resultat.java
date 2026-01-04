package com.txlforma.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Resultat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_note")
    private Long id;

    @Column(name = "nom_note")
    private String nomNote;

    @Column(name = "valeur_note")
    private Float valeurNote;

    // Relation vers l'Apprenti (Utilisateur)
    // Dans le MLD c'est "idUser"
    @ManyToOne
    @JoinColumn(name = "id_user")
    private Utilisateur apprenti;

    // Relation vers l'Intervenant (Utilisateur)
    // Dans le MLD c'est "IdIterv"
    @ManyToOne
    @JoinColumn(name = "id_iterv")
    private Utilisateur intervenant;

    // Relation vers la Session
    // ⚠️ Assure-toi d'avoir une classe "Session" ou change le type si nécessaire
    //@ManyToOne
   // @JoinColumn(name = "id_sessions")
   // private Session session;
}