package com.txlforma.api.Service;

import com.txlforma.api.model.*;
import com.txlforma.api.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Utilisateur inscrire(Utilisateur u) {
        // 1. Générer nom.prenom
        String pseudo = u.getNom().toLowerCase() + "." + u.getPrenom().toLowerCase();
        u.setPseudo(pseudo);

        // 2. Hacher le mot de passe
        u.setMotDePasse(passwordEncoder.encode(u.getMotDePasse()));

        // 3. Rôle par défaut
        u.setRole(Role.APPRENTI);

        return repository.save(u);
    }

    public Utilisateur creerIntervenant(Utilisateur u) {

        // 1. Génération du pseudo
        String pseudo = u.getNom().toLowerCase() + "." + u.getPrenom().toLowerCase();
        u.setPseudo(pseudo);

        // 2. Hachage du mot de passe
        u.setMotDePasse(passwordEncoder.encode(u.getMotDePasse()));

        // 3. ICI c'est la différence : on force INTERVENANT
        u.setRole(Role.INTERVENANT);

        return repository.save(u);
    }

    public Utilisateur creerAdmin(Utilisateur u) {
        String pseudo = u.getNom().toLowerCase() + "." + u.getPrenom().toLowerCase();
        u.setPseudo(pseudo);
        u.setMotDePasse(passwordEncoder.encode(u.getMotDePasse()));

        // Force ADMIN
        u.setRole(Role.ADMIN);

        return repository.save(u);
    }
}
