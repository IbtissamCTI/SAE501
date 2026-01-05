package com.txlforma.api.controller;

import com.txlforma.api.model.*;
import com.txlforma.api.repository.*;
import com.txlforma.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired private AuthService service;
    @Autowired private SessionRepository sessionRepository;
    @Autowired private FormationRepository formationRepository;
    @Autowired private UtilisateurRepository utilisateurRepository;

    @GetMapping("/intervenants")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Utilisateur>> getIntervenants() {
        return ResponseEntity.ok(utilisateurRepository.findByRole(Role.INTERVENANT));
    }

    @PostMapping("/intervenants")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Utilisateur> addIntervenant(@RequestBody Utilisateur u) {
        return ResponseEntity.ok(service.creerIntervenant(u));
    }

    @GetMapping("/formations")
    public ResponseEntity<List<Formation>> getFormations() {
        return ResponseEntity.ok(formationRepository.findAll());
    }

    @PostMapping("/formations")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Formation> addFormation(@RequestBody Formation f) {
        return ResponseEntity.ok(formationRepository.save(f));
    }

    @GetMapping("/sessions")
    public ResponseEntity<List<Session>> getSessions() {
        return ResponseEntity.ok(sessionRepository.findAll());
    }

    @PostMapping("/sessions")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Session> addSession(@RequestBody Session s) {
        return ResponseEntity.ok(sessionRepository.save(s));
    }
}