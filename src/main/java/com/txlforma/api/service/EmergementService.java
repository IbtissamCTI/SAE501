package com.txlforma.api.service;

import com.txlforma.api.model.*;
import com.txlforma.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

/**
 * Service de gestion des émargements (présences)
 */
@Service
public class EmergementService {

    @Autowired
    private EmergementRepository emargementRepo;

    @Autowired
    private SessionRepository sessionRepo;

    @Autowired
    private UtilisateurRepository utilisateurRepo;

    /**
     * Permet à un apprenti de signer sa présence pour une session
     *
     * @param pseudoApprenti Le pseudo de l'apprenti connecté
     * @param idSession L'ID de la session
     * @return Emergement L'émargement créé
     * @throws RuntimeException Si l'utilisateur n'existe pas, la session n'existe pas, ou s'il a déjà signé
     */
    public Emergement signerPresence(String pseudoApprenti, Long idSession) {

        // 1. Récupérer l'apprenti via son pseudo
        Utilisateur apprenti = utilisateurRepo.findByPseudo(pseudoApprenti)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // 2. Récupérer la session
        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        // 3. Vérifier s'il a déjà signé
        if (emargementRepo.existsByApprentiAndSession(apprenti, session)) {
            throw new RuntimeException("Vous avez déjà signé pour cette session !");
        }

        // 4. Création de l'émargement
        Emergement emargement = new Emergement();
        emargement.setApprenti(apprenti);
        emargement.setSession(session);
        emargement.setPresent(true);
        // ✅ CORRECTION : Utiliser setDateEmergement() au lieu de setDateSignature()
        emargement.setDateEmergement(LocalDateTime.now());

        return emargementRepo.save(emargement);
    }

    /**
     * Récupère tous les émargements d'une session
     *
     * @param idSession L'ID de la session
     * @return Liste des émargements
     */
    public java.util.List<Emergement> getEmargementsBySession(Long idSession) {
        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));
        return emargementRepo.findBySession(session);
    }

    /**
     * Récupère tous les émargements d'un apprenti
     *
     * @param idApprenti L'ID de l'apprenti
     * @return Liste des émargements
     */
    public java.util.List<Emergement> getEmargementsByApprenti(Long idApprenti) {
        Utilisateur apprenti = utilisateurRepo.findById(idApprenti)
                .orElseThrow(() -> new RuntimeException("Apprenti introuvable"));
        return emargementRepo.findByApprenti(apprenti);
    }
}