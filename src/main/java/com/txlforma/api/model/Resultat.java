package com.txlforma.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "resultats")
public class Resultat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "apprenti_id", nullable = false)
    private Utilisateur apprenti;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    private Double note;
    private String appreciation;
    private Boolean valide;
    private LocalDate dateExamen;

    public Resultat() {
    }

    // Constructeur complet
    public Resultat(Utilisateur apprenti, Session session, Double note,
                    String appreciation, Boolean valide, LocalDate dateExamen) {
        this.apprenti = apprenti;
        this.session = session;
        this.note = note;
        this.appreciation = appreciation;
        this.valide = valide;
        this.dateExamen = dateExamen;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Utilisateur getApprenti() { return apprenti; }
    public void setApprenti(Utilisateur apprenti) { this.apprenti = apprenti; }

    public Session getSession() { return session; }
    public void setSession(Session session) { this.session = session; }

    public Double getNote() { return note; }

    // ✅ La règle métier est ici : si on met une note, on calcule la réussite
    public void setNote(Double note) {
        this.note = note;
        if (note != null) {
            this.valide = note >= 10.0;
        }
    }

    public String getAppreciation() { return appreciation; }
    public void setAppreciation(String appreciation) { this.appreciation = appreciation; }

    public Boolean getValide() { return valide; }
    public void setValide(Boolean valide) { this.valide = valide; }

    public LocalDate getDateExamen() { return dateExamen; }
    public void setDateExamen(LocalDate dateExamen) { this.dateExamen = dateExamen; }

    @Override
    public String toString() {
        return "Resultat{" + "id=" + id + ", note=" + note + ", valide=" + valide + '}';
    }
}