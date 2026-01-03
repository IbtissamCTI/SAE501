package com.txlforma.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Apprentie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;

    private String nom;
    private String prenom;
    private String email;
}