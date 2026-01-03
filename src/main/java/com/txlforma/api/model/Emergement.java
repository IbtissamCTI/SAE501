package com.txlforma.api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Emergement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmerg;

    private LocalDateTime date;
    private Boolean statut;

    @ManyToOne
    @JoinColumn(name = "idUser")
    private Apprentie apprentie;

    @ManyToOne
    @JoinColumn(name = "idSessions")
    private Sessions session;

    // j'ai mis get et set manuellement a cause d'une erreur qui persistait :/

    public Long getIdEmerg() {
        return idEmerg;
    }

    public void setIdEmerg(Long idEmerg) {
        this.idEmerg = idEmerg;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Boolean getStatut() {
        return statut;
    }

    public void setStatut(Boolean statut) {
        this.statut = statut;
    }

    public Apprentie getApprentie() {
        return apprentie;
    }

    public void setApprentie(Apprentie apprentie) {
        this.apprentie = apprentie;
    }

    public Sessions getSession() {
        return session;
    }

    public void setSession(Sessions session) {
        this.session = session;
    }
}