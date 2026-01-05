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

    // Ajouter une note (Admin ou Intervenant seulement)
    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'INTERVENANT')")
    public ResponseEntity<Resultat> addResultat(@RequestBody Resultat resultat,
                                                @RequestParam Long idApprenti,
                                                @RequestParam(required = false) Long idSession) {
        return ResponseEntity.ok(service.ajouterNote(resultat, idApprenti, idSession));
    }

    // Voir toutes les notes (Admin)
    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<Resultat>> getAllResultats() {
        return ResponseEntity.ok(service.getAllResultats());
    }

    // Voir les notes d'un étudiant spécifique
    @GetMapping("/apprenti/{id}")
    public ResponseEntity<List<Resultat>> getResultatsByApprenti(@PathVariable Long id) {
        return ResponseEntity.ok(service.getNotesApprenti(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resultat> getResultatById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getResultatById(id));
    }
}