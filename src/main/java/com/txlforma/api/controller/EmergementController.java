package com.txlforma.api.controller;

import com.txlforma.api.model.Emergement;
import com.txlforma.api.service.EmergementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emargement")
public class EmergementController {

    @Autowired private EmergementService service;

    @PostMapping("/signer")
    public ResponseEntity<?> signer(@RequestParam Long idSession, Authentication authentication) {
        try {
            Emergement e = service.signerPresence(authentication.getName(), idSession);
            return ResponseEntity.ok(e);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}