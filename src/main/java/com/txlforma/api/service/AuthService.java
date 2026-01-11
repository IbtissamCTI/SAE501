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

    public Map<String, String> register(Utilisateur utilisateur) {
        if (utilisateurRepository.findByPseudo(utilisateur.getPseudo()).isPresent()) {
            throw new RuntimeException("Ce pseudo est déjà pris.");
        }

        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));

        if (utilisateur.getRole() == null) {
            utilisateur.setRole(Role.APPRENTI);
        }

        Utilisateur savedUser = utilisateurRepository.save(utilisateur);

        if (utilisateur.getRole() == Role.APPRENTI) {
            Apprentie apprentie = new Apprentie();
            apprentie.setNom(utilisateur.getNom());
            apprentie.setPrenom(utilisateur.getPrenom());
            apprentie.setEmail(utilisateur.getEmail());
            if (savedUser.getId() != null) {
                apprentie.setIdUser(savedUser.getId());
            }
            apprentieRepository.save(apprentie);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Inscription réussie");
        return response;
    }

    public Map<String, String> inscrire(Utilisateur utilisateur) {
        return this.register(utilisateur);
    }

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

    public Utilisateur creerIntervenant(Utilisateur utilisateur) {
        if (utilisateurRepository.findByPseudo(utilisateur.getPseudo()).isPresent()) {
            throw new RuntimeException("Ce pseudo est déjà pris.");
        }

        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        utilisateur.setRole(Role.INTERVENANT);

        return utilisateurRepository.save(utilisateur);
    }

    public Utilisateur creerAdmin(Utilisateur utilisateur) {
        Optional<Utilisateur> existing = utilisateurRepository.findByPseudo(utilisateur.getPseudo());
        if (existing.isPresent()) {
            return existing.get();
        }

        utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));
        utilisateur.setRole(Role.ADMIN);

        return utilisateurRepository.save(utilisateur);
    }
}