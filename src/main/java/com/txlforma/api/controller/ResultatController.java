package com.txlforma.api.controller;

import com.txlforma.api.model.Resultat;
import com.txlforma.api.repository.ResultatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/resultats")
public class ResultatController {

    @Autowired
    private ResultatRepository resultatRepository;

    // Ajouter une nouvelle note
    @PostMapping
    public ResponseEntity<Resultat> addResultat(@RequestBody Resultat resultat) {
        return ResponseEntity.ok(resultatRepository.save(resultat));
    }

    // Récupérer toutes les notes
    @GetMapping
    public ResponseEntity<List<Resultat>> getAllResultats() {
        return ResponseEntity.ok(resultatRepository.findAll());
    }

    // Récupérer les notes d'un étudiant (par son ID)
    @GetMapping("/apprenti/{id}")
    public ResponseEntity<List<Resultat>> getResultatsByApprenti(@PathVariable Long id) {
        return ResponseEntity.ok(resultatRepository.findByApprentiId(id));
    }

    // Récupérer une note précise par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Resultat> getResultatById(@PathVariable Long id) {
        Optional<Resultat> res = resultatRepository.findById(id);
        return res.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}