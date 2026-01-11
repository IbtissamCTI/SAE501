package com.txlforma.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "emergements")
public class Emergement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "apprenti_id", nullable = false)
    private Utilisateur apprenti;

    private LocalDateTime dateEmergement; // Date de signature de présence

    private Boolean present;

    @Column(length = 500)
    private String commentaire;


    public Emergement() {
    }

    public Emergement(Session session, Utilisateur apprenti,
                      LocalDateTime dateEmergement, Boolean present) {
        this.session = session;
        this.apprenti = apprenti;
        this.dateEmergement = dateEmergement;
        this.present = present;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public Utilisateur getApprenti() {
        return apprenti;
    }

    public void setApprenti(Utilisateur apprenti) {
        this.apprenti = apprenti;
    }

    public LocalDateTime getDateEmergement() {
        return dateEmergement;
    }

    public void setDateEmergement(LocalDateTime dateEmergement) {
        this.dateEmergement = dateEmergement;
    }

    public Boolean getPresent() {
        return present;
    }

    public void setPresent(Boolean present) {
        this.present = present;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    @Override
    public String toString() {
        return "Emergement{" +
                "id=" + id +
                ", dateEmergement=" + dateEmergement +
                ", present=" + present +
                '}';
    }
}