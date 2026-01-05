package com.txlforma.api.service;

import com.txlforma.api.model.*;
import com.txlforma.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class EmergementService {

    @Autowired private EmergementRepository emargementRepo;
    @Autowired private SessionRepository sessionRepo;
    @Autowired private UtilisateurRepository utilisateurRepo;

    // On passe le login (email ou pseudo) de l'utilisateur connecté pour la sécurité
    public Emergement signerPresence(String pseudoApprenti, Long idSession) {

        // 1. Récupérer l'apprenti via son compte connecté (plus sécurisé)
        Utilisateur apprenti = utilisateurRepo.findByPseudo(pseudoApprenti)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // 2. Récupérer la session
        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        // 3. LOGIQUE : Vérifier s'il a déjà signé !
        if (emargementRepo.existsByApprentiAndSession(apprenti, session)) {
            throw new RuntimeException("Vous avez déjà signé pour cette session !");
        }

        // 4. Création de la signature
        Emergement emargement = new Emergement();
        emargement.setApprenti(apprenti);
        emargement.setSession(session);
        emargement.setPresent(true);
        emargement.setDateSignature(LocalDateTime.now()); // Horodatage automatique

        return emargementRepo.save(emargement);
    }
}