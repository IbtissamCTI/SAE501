package com.txlforma.api.controller;

import com.txlforma.api.model.Formation;
import com.txlforma.api.model.Session;
import com.txlforma.api.service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List; // Import indispensable pour utiliser List

@RestController
@RequestMapping("/api/formations")
public class FormationController {

    @Autowired
    private FormationService service; // Le nom de la variable est 'service'

    @PostMapping("/admin/creer")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Formation> create(@RequestBody Formation f) {
        // Correction : on utilise 'service' pour correspondre à la déclaration ci-dessus
        return ResponseEntity.ok(service.creerFormation(f));
    }

    // PUBLIC : Récupérer tout le catalogue
    @GetMapping
    public List<Formation> catalogue() {
        return service.getAllFormations();
    }

    // PUBLIC : Filtrer par catégorie
    @GetMapping("/categorie/{cat}")
    public List<Formation> catalogueParCategorie(@PathVariable String cat) {
        return service.getByCategorie(cat);
    }

    // ADMIN : Créer une nouvelle formation (Doublon de la route /admin/creer)
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Formation> createFormation(@RequestBody Formation f) {
        return ResponseEntity.ok(service.creerFormation(f));
    }

    // ADMIN : Ajouter une session à une formation existante
    @PostMapping("/{id}/sessions")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Session> addSession(@PathVariable Long id, @RequestBody Session s) {
        return ResponseEntity.ok(service.ajouterSession(id, s));
    }
}