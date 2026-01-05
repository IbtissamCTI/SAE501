package com.txlforma.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Emergement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean present;

    // NOUVEAU : Pour savoir QUAND l'élève a signé
    private LocalDateTime dateSignature;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Session session;

    @ManyToOne
    @JoinColumn(name = "apprenti_id")
    private Utilisateur apprenti;
}