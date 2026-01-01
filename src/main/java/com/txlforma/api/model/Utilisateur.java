package com.txlforma.api.model;


import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;

    @Column(unique = true)
    private String pseudo;
    private String email;
    private String telephone;
    private String motDePasse;

    @Enumerated(EnumType.STRING)
    private Role role;
}