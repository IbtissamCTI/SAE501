package com.txlforma.api.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "formations")
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String categorie;

    @Column(columnDefinition = "TEXT")
    private String descriptionCourte;

    @Column(columnDefinition = "TEXT")
    private String objectifs;

    @Column(columnDefinition = "TEXT")
    private String prerequis;

    @Column(columnDefinition = "TEXT")
    private String programme;

    private Integer dureeHeures;
    private String niveau;
    private Double prix;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Session> sessions = new ArrayList<>();

    public Formation() {}

    public Formation(String titre, String categorie, String desc, String obj, String pre, String prog, Integer duree, String niveau, Double prix) {
        this.titre = titre;
        this.categorie = categorie;
        this.descriptionCourte = desc;
        this.objectifs = obj;
        this.prerequis = pre;
        this.programme = prog;
        this.dureeHeures = duree;
        this.niveau = niveau;
        this.prix = prix;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getCategorie() { return categorie; }
    public void setCategorie(String categorie) { this.categorie = categorie; }
    public String getDescriptionCourte() { return descriptionCourte; }
    public void setDescriptionCourte(String descriptionCourte) { this.descriptionCourte = descriptionCourte; }
    public String getObjectifs() { return objectifs; }
    public void setObjectifs(String objectifs) { this.objectifs = objectifs; }
    public String getPrerequis() { return prerequis; }
    public void setPrerequis(String prerequis) { this.prerequis = prerequis; }
    public String getProgramme() { return programme; }
    public void setProgramme(String programme) { this.programme = programme; }
    public Integer getDureeHeures() { return dureeHeures; }
    public void setDureeHeures(Integer dureeHeures) { this.dureeHeures = dureeHeures; }
    public String getNiveau() { return niveau; }
    public void setNiveau(String niveau) { this.niveau = niveau; }
    public Double getPrix() { return prix; }
    public void setPrix(Double prix) { this.prix = prix; }
    public List<Session> getSessions() { return sessions; }
    public void setSessions(List<Session> sessions) { this.sessions = sessions; }
}