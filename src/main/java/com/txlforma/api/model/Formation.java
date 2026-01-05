package com.txlforma.api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "formations")
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String description;
    private String categorie;
    private Integer dureeHeures;
    private Double prix;

    public Formation() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String t) { this.titre = t; }
    public String getDescription() { return description; }
    public void setDescription(String d) { this.description = d; }
    public String getCategorie() { return categorie; }
    public void setCategorie(String c) { this.categorie = c; }
    public Integer getDureeHeures() { return dureeHeures; }
    public void setDureeHeures(Integer d) { this.dureeHeures = d; }
    public Double getPrix() { return prix; }
    public void setPrix(Double p) { this.prix = p; }
}