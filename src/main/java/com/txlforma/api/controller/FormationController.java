package com.txlforma.api.controller;

import com.txlforma.api.model.Formation;
import com.txlforma.api.model.Session;
import com.txlforma.api.service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/formations")
@CrossOrigin(origins = "http://localhost:3000")
public class FormationController {

    @Autowired
    private FormationService service;

    @GetMapping
    public List<Formation> catalogue() {
        return service.getAllFormations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formation> getById(@PathVariable Long id) {
        return service.getFormationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categorie/{cat}")
    public List<Formation> catalogueParCategorie(@PathVariable String cat) {
        return service.getByCategorie(cat);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Formation> createFormation(@RequestBody Formation f) {
        return ResponseEntity.ok(service.creerFormation(f));
    }

    @PostMapping("/{id}/sessions")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Session> addSession(@PathVariable Long id, @RequestBody Session s) {
        return ResponseEntity.ok(service.ajouterSession(id, s));
    }
}