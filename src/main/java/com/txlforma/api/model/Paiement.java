/*package com.txlforma.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPaiement;

    private Double montant; // Nouveau : récupéré de la Formation
    private boolean statusPaiement;

    @ManyToOne
    @JoinColumn(name = "id_apprenti")
    private Utilisateur apprenti;

    @ManyToOne
    @JoinColumn(name = "id_session")
    private Session session;
}*/