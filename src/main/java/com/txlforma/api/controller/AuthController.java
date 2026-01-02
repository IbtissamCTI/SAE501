package com.txlforma.api.controller;

import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth") // <--- Vérifie bien que c'est "/api/auth" ici
public class AuthController {

    @Autowired
    private AuthService service;

    // ... (ta méthode register existante) ...

    // 👇 CELLE-CI DOIT ÊTRE ICI (PAS DANS ADMIN CONTROLLER)
    @PostMapping("/create-admin-secret")
    public ResponseEntity<Utilisateur> createAdmin(@RequestBody Utilisateur u) {
        return ResponseEntity.ok(service.creerAdmin(u));
    }
}