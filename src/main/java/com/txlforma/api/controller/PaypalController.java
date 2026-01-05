package com.txlforma.api.controller; // Vérifie que ce package correspond à ton dossier

import com.txlforma.api.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paypal")
@CrossOrigin(origins = "http://localhost:3000") // Autorise ton React à appeler l'API
public class PaypalController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/capture-paiement")
    public ResponseEntity<String> validerInscription(@RequestParam Long idSession, @RequestParam Long idApprenti) {
        try {
            sessionService.inscrireApprenti(idSession, idApprenti);
            return ResponseEntity.ok("Inscription réussie après paiement PayPal");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'inscription : " + e.getMessage());
        }
    }
}