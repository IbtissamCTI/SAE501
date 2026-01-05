package com.txlforma.api.service;

import com.txlforma.api.model.*;
import com.txlforma.api.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired private UtilisateurRepository repository;
    @Autowired private PasswordEncoder passwordEncoder;

    // Inscription (existant)
    public Utilisateur inscrire(Utilisateur u) {
        String pseudo = u.getNom().toLowerCase() + "." + u.getPrenom().toLowerCase();
        u.setPseudo(pseudo);
        u.setMotDePasse(passwordEncoder.encode(u.getMotDePasse()));
        u.setRole(Role.APPRENTI);
        return repository.save(u);
    }

    // Création Admin (existant)
    public Utilisateur creerAdmin(Utilisateur u) {
        String pseudo = u.getNom().toLowerCase() + "." + u.getPrenom().toLowerCase();
        u.setPseudo(pseudo);
        u.setMotDePasse(passwordEncoder.encode(u.getMotDePasse()));
        u.setRole(Role.ADMIN);
        return repository.save(u);
    }

    // Création Intervenant (existant)
    // Dans AuthService.java

    public Utilisateur creerIntervenant(Utilisateur u) {
        // 1. Vérification de sécurité pour le mot de passe
        if (u.getMotDePasse() == null || u.getMotDePasse().isEmpty()) {
            throw new IllegalArgumentException("Le mot de passe est obligatoire dans la requête JSON");
        }

        // 2. Génération du pseudo si non fourni
        if (u.getPseudo() == null || u.getPseudo().isEmpty()) {
            String pseudoGenere = u.getNom().toLowerCase() + "." + u.getPrenom().toLowerCase();
            u.setPseudo(pseudoGenere);
        }

        // 3. Hachage du mot de passe
        u.setMotDePasse(passwordEncoder.encode(u.getMotDePasse()));

        // 4. Attribution du rôle
        u.setRole(Role.INTERVENANT);

        return repository.save(u);
    }

    // ✅ NOUVEAU : Méthode LOGIN pour React
    public Utilisateur login(String pseudo, String rawPassword) {
        // 1. Chercher l'utilisateur par pseudo
        Utilisateur user = repository.findByPseudo(pseudo)
                .orElseThrow(() -> new RuntimeException("Utilisateur inconnu"));

        // 2. Vérifier le mot de passe
        if (passwordEncoder.matches(rawPassword, user.getMotDePasse())) {
            return user; // C'est bon, on retourne l'utilisateur
        } else {
            throw new RuntimeException("Mot de passe incorrect");
        }
    }
}