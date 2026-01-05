package com.txlforma.api.controller;

import com.txlforma.api.model.Resultat;
import com.txlforma.api.service.ResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/resultats")
public class ResultatController {

    @Autowired
    private ResultatService service;

    // ✅ NOUVELLE ROUTE (Intervenant : note + calcul auto)
    @PostMapping("/noter")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'INTERVENANT')")
    public ResponseEntity<?> noterEleve(
            @RequestParam Long idSession,
            @RequestParam Long idApprenti,
            @RequestParam Double note,
            @RequestParam(required = false) String appreciation) {
        try {
            Resultat res = service.attribuerNoteFinale(idSession, idApprenti, note, appreciation);
            return ResponseEntity.ok(res);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Erreur : " + e.getMessage());
        }
    }

    // ✅ TON ANCIENNE ROUTE (Garde-la pour ne rien casser)
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'INTERVENANT')")
    public ResponseEntity<Resultat> addResultat(@RequestBody Resultat resultat,
                                                @RequestParam Long idApprenti,
                                                @RequestParam(required = false) Long idSession) {
        return ResponseEntity.ok(service.ajouterNote(resultat, idApprenti, idSession));
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Resultat>> getAllResultats() {
        return ResponseEntity.ok(service.getAllResultats());
    }

    @GetMapping("/apprenti/{id}")
    public ResponseEntity<List<Resultat>> getResultatsByApprenti(@PathVariable Long id) {
        return ResponseEntity.ok(service.getNotesApprenti(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resultat> getResultatById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getResultatById(id));
    }
}