package com.txlforma.api.controller;

import com.txlforma.api.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paypal")
@CrossOrigin(origins = "http://localhost:5173")
public class PaypalController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/capture-paiement")
    public ResponseEntity<String> validerInscription(@RequestParam Long idSession, @RequestParam Long idApprenti) {
        try {
            if (idApprenti == null) {
                return ResponseEntity.status(400).body("Erreur : l'ID de l'apprenti est manquant.");
            }

            sessionService.inscrireApprenti(idSession, idApprenti);

            return ResponseEntity.ok("Inscription validée avec succès.");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'inscription : " + e.getMessage());
        }
    }
}