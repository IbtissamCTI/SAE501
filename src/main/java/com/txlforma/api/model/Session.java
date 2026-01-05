package com.txlforma.api.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

@Entity
@Data
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String lieu;
    private String salle;
    private String horaires;

    @ManyToOne
    @JoinColumn(name = "formation_id")
    @JsonIgnore
    private Formation formation;

    @ManyToOne
    @JoinColumn(name = "intervenant_id")
    private Utilisateur intervenant;

    @OneToMany(mappedBy = "session")
    @JsonIgnore
    private List<Emergement> emargements;

    @ManyToMany
    @JoinTable(
            name = "inscription",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "apprenti_id")
    )
    private List<Utilisateur> participants = new ArrayList<>();
}