package com.txlforma.api.controller;

import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> register(@RequestBody Utilisateur u) {
        return ResponseEntity.ok(service.inscrire(u));
    }
}