package com.txlforma.api.controller;

import com.txlforma.api.model.LoginRequest;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> register(@RequestBody Utilisateur u) {
        return ResponseEntity.ok(service.inscrire(u));
    }

    @PostMapping("/create-admin-secret")
    public ResponseEntity<Utilisateur> createAdmin(@RequestBody Utilisateur u) {
        return ResponseEntity.ok(service.creerAdmin(u));
    }

    // ✅ LA ROUTE POUR REACT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Utilisateur u = service.login(loginRequest.getPseudo(), loginRequest.getMotDePasse());
            return ResponseEntity.ok(u);
        } catch (RuntimeException e) {
            // Renvoie une erreur 401 si login raté
            return ResponseEntity.status(401).body("Erreur : " + e.getMessage());
        }
    }
}