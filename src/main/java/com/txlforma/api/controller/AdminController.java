package com.txlforma.api.controller;

import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.service.AuthService; // ✅ Correction : minuscule 'service'
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AuthService service;

    // Créer un Intervenant (Réservé aux Admins)
    // URL : POST /api/admin/intervenants
    @PostMapping("/intervenants")
    @PreAuthorize("hasAuthority('ADMIN')") // Double sécurité (optionnel si SecurityConfig est bon, mais recommandé)
    public ResponseEntity<Utilisateur> addIntervenant(@RequestBody Utilisateur u) {
        return ResponseEntity.ok(service.creerIntervenant(u));
    }
}