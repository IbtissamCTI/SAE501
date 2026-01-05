package com.txlforma.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Resultat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double note;
    private String commentaire;

    @ManyToOne
    @JoinColumn(name = "apprenti_id")
    private Utilisateur apprenti;

    @ManyToOne
    @JoinColumn(name = "session_id") // Optionnel : pour lier la note à une session précise
    private Session session;
}