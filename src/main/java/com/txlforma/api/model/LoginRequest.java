package com.txlforma.api.model; // 👈 Regarde ici : c'est bien le package .model

import lombok.Data;

@Data
public class LoginRequest {
    private String pseudo;
    private String motDePasse;
}