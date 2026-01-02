package com.txlforma.api.controller;

import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AuthService service;

    @PostMapping("/intervenants")
    public ResponseEntity<Utilisateur> addIntervenant(@RequestBody Utilisateur u) {
        return ResponseEntity.ok(service.creerIntervenant(u));
    }
}
