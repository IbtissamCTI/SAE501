package com.txlforma.api.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

/**
 * Entité Session - Représente une session de formation
 */
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
    private String statut = "A VENIR"; // Valeur par défaut
    @ManyToOne
    @JoinColumn(name = "formation_id")
    @JsonIgnore
    private Formation formation;

    @ManyToOne
    @JoinColumn(name = "intervenant_id")
    private Utilisateur intervenant;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Emergement> emargements = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "inscription",
            joinColumns = @JoinColumn(name = "session_id"),
            inverseJoinColumns = @JoinColumn(name = "apprenti_id")
    )
    private List<Utilisateur> participants = new ArrayList<>();

    // ============================================
    // CONSTRUCTEURS
    // ============================================

    public Session() {
    }

    public Session(Long id, LocalDate dateDebut, LocalDate dateFin, String lieu,
                   String salle, String horaires) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.lieu = lieu;
        this.salle = salle;
        this.horaires = horaires;
    }

    // ============================================
    // GETTERS ET SETTERS
    // ============================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getSalle() {
        return salle;
    }

    public void setSalle(String salle) {
        this.salle = salle;
    }

    public String getHoraires() {
        return horaires;
    }

    public void setHoraires(String horaires) {
        this.horaires = horaires;
    }

    public Formation getFormation() {
        return formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public Utilisateur getIntervenant() {
        return intervenant;
    }

    public void setIntervenant(Utilisateur intervenant) {
        this.intervenant = intervenant;
    }

    public List<Emergement> getEmargements() {
        return emargements;
    }

    public void setEmargements(List<Emergement> emargements) {
        this.emargements = emargements;
    }

    public List<Utilisateur> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Utilisateur> participants) {
        this.participants = participants;
    }

    // ============================================
    // MÉTHODES UTILITAIRES
    // ============================================

    /**
     * Ajoute un participant à la session
     */
    public void addParticipant(Utilisateur participant) {
        if (!this.participants.contains(participant)) {
            this.participants.add(participant);
        }
    }

    /**
     * Retire un participant de la session
     */
    public void removeParticipant(Utilisateur participant) {
        this.participants.remove(participant);
    }

    @Override
    public String toString() {
        return "Session{" +
                "id=" + id +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", lieu='" + lieu + '\'' +
                ", salle='" + salle + '\'' +
                ", horaires='" + horaires + '\'' +
                '}';
    }
}