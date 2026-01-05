package com.txlforma.api.controller;

import com.txlforma.api.model.Session;
import com.txlforma.api.service.SessionService; // ✅ Correction : minuscule 'service'
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // 👈 Import nécessaire pour la sécurité
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired private SessionService service;

    // ADMIN : Modifier une session (Salle, Prof, Horaires)
    // URL : PUT /api/sessions/1?idProf=5
    // ✅ SÉCURITÉ : Seul l'admin peut modifier
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Session> update(@PathVariable Long id,
                                          @RequestBody Session s,
                                          @RequestParam(required = false) Long idProf) {
        return ResponseEntity.ok(service.updateSession(id, s, idProf));
    }

    // ADMIN : Supprimer une session
    // URL : DELETE /api/sessions/1
    // ✅ SÉCURITÉ : Seul l'admin peut supprimer
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.deleteSession(id);
        return ResponseEntity.ok("Session supprimée");
    }

    // INTERVENANT : Voir son Dashboard (Mes cours)
    // URL : GET /api/sessions/intervenant/5
    // Pas de restriction ADMIN ici, car un prof doit pouvoir voir ses cours
    @GetMapping("/intervenant/{idProf}")
    public List<Session> getMonDashboard(@PathVariable Long idProf) {
        return service.getPlanningIntervenant(idProf);
    }
}