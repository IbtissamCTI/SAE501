package com.txlforma.api.service;

import com.txlforma.api.model.*;
import com.txlforma.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaiementService {

    @Autowired private PaiementRepository paiementRepo;
    @Autowired private SessionRepository sessionRepo;
    @Autowired private UtilisateurRepository utilisateurRepo;

    @Transactional
    public Paiement traiterPaiementEtInscription(String pseudo, Long idSession) {
        // 1. Récupérer l'utilisateur
        Utilisateur apprenti = utilisateurRepo.findByPseudo(pseudo)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // 2. Récupérer la session
        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        // 3. Récupérer la formation associée pour avoir le prix
        Formation formation = session.getFormation();
        if (formation == null) {
            throw new RuntimeException("Cette session n'est rattachée à aucune formation.");
        }

        // 4. Vérification de l'inscription existante
        if (session.getParticipants().contains(apprenti)) {
            throw new RuntimeException("Vous êtes déjà inscrit et avez déjà payé pour cette session.");
        }

        // 5. Inscription (Table de jointure @ManyToMany dans ton code)
        session.getParticipants().add(apprenti);
        sessionRepo.save(session);

        // 6. Création du reçu de paiement avec le prix de la formation
        Paiement paiement = new Paiement();
        paiement.setApprenti(apprenti);
        paiement.setSession(session);
        paiement.setMontant(formation.getPrix()); // On utilise formation.getPrix() de ton entité Formation
        paiement.setStatusPaiement(true);

        return paiementRepo.save(paiement);
    }
}