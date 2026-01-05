package com.txlforma.api.controller;

import com.txlforma.api.model.Formation;
import com.txlforma.api.model.Session;
import com.txlforma.api.service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/formations")
public class FormationController {

    @Autowired private FormationService service;

    // PUBLIC : Récupérer tout le catalogue
    @GetMapping
    public List<Formation> catalogue() {
        return service.getAllFormations();
    }

    // PUBLIC : Filtrer par catégorie (ex: /api/formations/categorie/Reseaux)
    @GetMapping("/categorie/{cat}")
    public List<Formation> catalogueParCategorie(@PathVariable String cat) {
        return service.getByCategorie(cat);
    }

    // ADMIN : Créer une nouvelle formation
    @PostMapping
    public ResponseEntity<Formation> createFormation(@RequestBody Formation f) {
        return ResponseEntity.ok(service.creerFormation(f));
    }

    // ADMIN : Ajouter une session à une formation existante
    // URL : /api/formations/1/sessions
    @PostMapping("/{id}/sessions")
    public ResponseEntity<Session> addSession(@PathVariable Long id, @RequestBody Session s) {
        return ResponseEntity.ok(service.ajouterSession(id, s));
    }
}