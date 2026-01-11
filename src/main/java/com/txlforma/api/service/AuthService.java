package com.txlforma.api.service;

import com.txlforma.api.model.Apprentie;
import com.txlforma.api.model.Role;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.repository.ApprentieRepository;
import com.txlforma.api.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private ApprentieRepository apprentieRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    // ============================================================
    // 1. INSCRIPTION APPRENTI (Utilisé par SignUp.jsx)
    // ============================================================
    public Map<String, String> register(Utilisateur utilisateur) {
        // Vérification si pseudo existe déjà
        if (utilisateurRepository.findByPseudo(utilisateur.getPseudo()).isPresent()) {
            throw new RuntimeException("Ce pseudo est déjà pris.");
        }

        // Encodage du mot de passe
        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));

        // Rôle par défaut
        if (utilisateur.getRole() == null) {
            utilisateur.setRole(Role.APPRENTI);
        }

        // Sauvegarde Utilisateur (Connexion)
        Utilisateur savedUser = utilisateurRepository.save(utilisateur);

        // SYNC: Création automatique dans la table APPRENTIE
        if (utilisateur.getRole() == Role.APPRENTI) {
            Apprentie apprentie = new Apprentie();
            apprentie.setNom(utilisateur.getNom());
            apprentie.setPrenom(utilisateur.getPrenom());
            apprentie.setEmail(utilisateur.getEmail());
            // Lien technique entre les deux tables
            if (savedUser.getId() != null) {
                apprentie.setIdUser(savedUser.getId());
            }
            apprentieRepository.save(apprentie);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Inscription réussie");
        return response;
    }

    // ALIAS : Si ton AuthController appelle "inscrire" au lieu de "register"
    public Map<String, String> inscrire(Utilisateur utilisateur) {
        return this.register(utilisateur);
    }

    // ============================================================
    // 2. CONNEXION (Utilisé par Login.jsx)
    // ============================================================
    public Map<String, Object> login(String pseudo, String motDePasse) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(pseudo, motDePasse));

        Utilisateur utilisateur = utilisateurRepository.findByPseudo(pseudo)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Map<String, Object> response = new HashMap<>();
        response.put("pseudo", utilisateur.getPseudo());
        response.put("role", utilisateur.getRole());
        response.put("email", utilisateur.getEmail());

        return response;
    }

    // ============================================================
    // 3. CRÉATION D'INTERVENANT (Utilisé par AdminController)
    // ============================================================
    public Utilisateur creerIntervenant(Utilisateur utilisateur) {
        if (utilisateurRepository.findByPseudo(utilisateur.getPseudo()).isPresent()) {
            throw new RuntimeException("Ce pseudo est déjà pris.");
        }

        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        utilisateur.setRole(Role.INTERVENANT);

        return utilisateurRepository.save(utilisateur);
    }

    // ============================================================
    // 4. CRÉATION D'ADMIN (Utilisé par DataSeeder)
    // ============================================================
    public Utilisateur creerAdmin(Utilisateur utilisateur) {
        // Si l'admin existe déjà, on le renvoie simplement pour éviter les doublons
        Optional<Utilisateur> existing = utilisateurRepository.findByPseudo(utilisateur.getPseudo());
        if (existing.isPresent()) {
            return existing.get();
        }

        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        utilisateur.setRole(Role.ADMIN);

        return utilisateurRepository.save(utilisateur);
    }
}