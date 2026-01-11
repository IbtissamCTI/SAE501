package com.txlforma.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sessions")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String lieu;
    private String salle;
    private String horaires;
    private String statut = "A VENIR";

    @ManyToOne
    @JoinColumn(name = "formation_id")
    private Formation formation;

    @ManyToOne
    @JoinColumn(name = "intervenant_id")
    private Utilisateur intervenant;

    @ManyToMany
    @JoinTable(
            name = "session_participants",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "utilisateur_id")
    )
    private List<Utilisateur> participants = new ArrayList<>();

    public Session() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDate d) { this.dateDebut = d; }
    public LocalDate getDateFin() { return dateFin; }
    public void setDateFin(LocalDate d) { this.dateFin = d; }
    public String getLieu() { return lieu; }
    public void setLieu(String l) { this.lieu = l; }
    public String getSalle() { return salle; }
    public void setSalle(String s) { this.salle = s; }
    public String getHoraires() { return horaires; }
    public void setHoraires(String h) { this.horaires = h; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public Formation getFormation() { return formation; }
    public void setFormation(Formation f) { this.formation = f; }
    public Utilisateur getIntervenant() { return intervenant; }
    public void setIntervenant(Utilisateur i) { this.intervenant = i; }

    public List<Utilisateur> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Utilisateur> participants) {
        this.participants = participants;
    }

    public void addParticipant(Utilisateur apprenti) {
        this.participants.add(apprenti);
    }

    public void removeParticipant(Utilisateur apprenti) {
        this.participants.remove(apprenti);
    }
}