package com.txlforma.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;

@Entity
@Data
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;       // Ex: "VLAN", "OSPF"
    private String categorie;   // Ex: "Réseaux et Télécoms"
    private String description; // Ex: "Maitriser le routage..."
    private Double prix;        // Ex: 1200.00
    private String duree;       // Ex: "3 jours"

    // Une formation a plusieurs sessions
    // mappedBy = "formation" : C'est le champ 'formation' dans Session.java qui fait le lien
    // cascade = ALL : Si je supprime la formation, je supprime ses sessions
    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Session> sessions = new ArrayList<>();
}