package com.txlforma.api.controller;

import com.txlforma.api.model.Paiement;
import com.txlforma.api.service.PaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paiements")
public class PaiementController {

    @Autowired private PaiementService service;

    @PostMapping("/payer")
    public ResponseEntity<?> payer(@RequestParam Long idSession, Authentication authentication) {
        try {
            // Sécurité : Seul le pseudo de l'utilisateur connecté est utilisé
            Paiement p = service.traiterPaiementEtInscription(authentication.getName(), idSession);
            return ResponseEntity.ok(p);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}