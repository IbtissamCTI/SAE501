package com.txlforma.api.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "formations")
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;

    // ✅ AJOUT : La variable categorie
    private String categorie;

    @Column(length = 2000)
    private String description;

    private Integer dureeHeures;

    private String niveau;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Session> sessions = new ArrayList<>();

    public Formation() {}

    // ✅ MISE À JOUR : Constructeur avec categorie
    public Formation(String titre, String categorie, String description, Integer dureeHeures, String niveau) {
        this.titre = titre;
        this.categorie = categorie;
        this.description = description;
        this.dureeHeures = dureeHeures;
        this.niveau = niveau;
    }

    // ============================================
    // GETTERS ET SETTERS (Ajoute ceux de categorie)
    // ============================================

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    // Garde tes autres getters/setters (id, titre, description, etc.) ici...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getDureeHeures() { return dureeHeures; }
    public void setDureeHeures(Integer dureeHeures) { this.dureeHeures = dureeHeures; }
    public String getNiveau() { return niveau; }
    public void setNiveau(String niveau) { this.niveau = niveau; }
    public List<Session> getSessions() { return sessions; }
    public void setSessions(List<Session> sessions) { this.sessions = sessions; }
}