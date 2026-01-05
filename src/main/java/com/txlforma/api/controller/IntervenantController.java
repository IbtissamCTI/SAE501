package com.txlforma.api.controller;

import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.repository.UtilisateurRepository;
import com.txlforma.api.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/intervenant")
@CrossOrigin(origins = "http://localhost:5173")
public class IntervenantController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private UtilisateurRepository userRepo;

    // ✅ RÉPARE L'ERREUR 404 : /api/intervenant/sessions
    @GetMapping("/sessions")
    public ResponseEntity<List<Session>> getMySessions(@AuthenticationPrincipal UserDetails userDetails) {
        Utilisateur currentIntervenant = userRepo.findByPseudo(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return ResponseEntity.ok(sessionService.getPlanningIntervenant(currentIntervenant.getId()));
    }

    // ✅ RÉPARE L'ERREUR 404 : /api/intervenant/planning
    @GetMapping("/planning")
    public ResponseEntity<List<Session>> getMyPlanning(@AuthenticationPrincipal UserDetails userDetails) {
        // Le planning et les sessions sont identiques pour l'affichage intervenant
        return getMySessions(userDetails);
    }

    // ✅ RÉPARE L'ERREUR 404 : /api/intervenant/profil
    @PutMapping("/profil")
    public ResponseEntity<Utilisateur> updateProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody Utilisateur updatedData) {
        Utilisateur user = userRepo.findByPseudo(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        user.setNom(updatedData.getNom());
        user.setPrenom(updatedData.getPrenom());
        user.setEmail(updatedData.getEmail());

        return ResponseEntity.ok(userRepo.save(user));
    }
}