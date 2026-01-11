package com.txlforma.api.controller;

import com.txlforma.api.model.Session;
import com.txlforma.api.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:5173") // Important pour React
public class SessionController {

    @Autowired private SessionService service;

    @GetMapping
    public List<Session> getAll() {
        return service.getAllSessions();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Session> update(@PathVariable Long id,
                                          @RequestBody Session s,
                                          @RequestParam(required = false) Long idProf) {
        return ResponseEntity.ok(service.updateSession(id, s, idProf));
    }

    @PostMapping("/admin/creer")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Session> create(@RequestBody Session s, @RequestParam Long idFormation) {
        return ResponseEntity.ok(service.creerSession(s, idFormation));
    }

    @GetMapping("/intervenant/{idProf}")
    public List<Session> getPlanning(@PathVariable Long idProf) {
        return service.getPlanningIntervenant(idProf);
    }

    @PostMapping("/{id}/inscription")
    public ResponseEntity<?> inscrire(@PathVariable Long id, @RequestParam Long idApprenti) {
        service.inscrireApprenti(id, idApprenti);
        return ResponseEntity.ok("Inscription réussie");
    }

    // ✅ Endpoint corrigé pour le Dashboard
    @GetMapping("/mes-sessions")
    public ResponseEntity<List<Session>> getSessionsApprenti(@RequestParam Long idApprenti) {
        // On passe par le service, pas par le repository directement
        List<Session> sessions = service.getSessionsPourApprenti(idApprenti);

        if (sessions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(sessions);
    }
}