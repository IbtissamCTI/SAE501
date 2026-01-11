package com.txlforma.api.service;

import com.txlforma.api.model.*;
import com.txlforma.api.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class EmergementService {

    @Autowired
    private EmergementRepository emargementRepo;

    @Autowired
    private SessionRepository sessionRepo;

    @Autowired
    private UtilisateurRepository utilisateurRepo;

    public Emergement signerPresence(String pseudoApprenti, Long idSession) {

        Utilisateur apprenti = utilisateurRepo.findByPseudo(pseudoApprenti)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        if (emargementRepo.existsByApprentiAndSession(apprenti, session)) {
            throw new RuntimeException("Vous avez déjà signé pour cette session !");
        }

        Emergement emargement = new Emergement();
        emargement.setApprenti(apprenti);
        emargement.setSession(session);
        emargement.setPresent(true);
        emargement.setDateEmergement(LocalDateTime.now());

        return emargementRepo.save(emargement);
    }

    public java.util.List<Emergement> getEmargementsBySession(Long idSession) {
        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));
        return emargementRepo.findBySession(session);
    }

    public java.util.List<Emergement> getEmargementsByApprenti(Long idApprenti) {
        Utilisateur apprenti = utilisateurRepo.findById(idApprenti)
                .orElseThrow(() -> new RuntimeException("Apprenti introuvable"));
        return emargementRepo.findByApprenti(apprenti);
    }
}