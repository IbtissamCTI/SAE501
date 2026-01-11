package com.txlforma.api.controller;

import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    // ... autres méthodes (register, etc.) ...

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String pseudo = loginRequest.get("pseudo");
        String motDePasse = loginRequest.get("motDePasse");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(pseudo, motDePasse));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Optional<Utilisateur> userOpt = utilisateurRepository.findByPseudo(pseudo);

        if (userOpt.isPresent()) {
            Utilisateur user = userOpt.get();

            // Création de la réponse JSON
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getId()); // ✅ C'EST LA CORRECTION CRUCIALE
            response.put("pseudo", user.getPseudo());
            response.put("email", user.getEmail());
            response.put("role", user.getRole());

            // Si vous générez un token, ajoutez-le ici :
            // response.put("token", "Basic " + Base64...); ou jwt

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Erreur d'authentification");
    }
}