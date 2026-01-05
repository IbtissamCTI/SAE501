package com.txlforma.api.service;

import com.txlforma.api.model.Resultat;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.model.Session;
import com.txlforma.api.repository.ResultatRepository;
import com.txlforma.api.repository.UtilisateurRepository;
import com.txlforma.api.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ResultatService {

    @Autowired private ResultatRepository resultatRepository;
    @Autowired private UtilisateurRepository utilisateurRepository;
    @Autowired private SessionRepository sessionRepository;

    // Nouvelle méthode pour l'intervenant (avec calcul auto du 10/20)
    public Resultat attribuerNoteFinale(Long idSession, Long idApprenti, Double note, String appreciation) {
        Session session = sessionRepository.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        Utilisateur apprenti = utilisateurRepository.findById(idApprenti)
                .orElseThrow(() -> new RuntimeException("Apprenti introuvable"));

        if (!session.getParticipants().contains(apprenti)) {
            throw new RuntimeException("Cet apprenti n'est pas inscrit à cette session !");
        }

        Resultat resultat = new Resultat();
        resultat.setSession(session);
        resultat.setApprenti(apprenti);
        resultat.setNote(note); // Déclenche le calcul automatique du "valide"
        resultat.setAppreciation(appreciation);
        resultat.setDateExamen(LocalDate.now());

        return resultatRepository.save(resultat);
    }

    // Ton ancienne méthode (pour compatibilité)
    public Resultat ajouterNote(Resultat resultat, Long idApprenti, Long idSession) {
        Utilisateur apprenti = utilisateurRepository.findById(idApprenti)
                .orElseThrow(() -> new RuntimeException("Apprenti introuvable"));

        if(idSession != null) {
            Session session = sessionRepository.findById(idSession)
                    .orElseThrow(() -> new RuntimeException("Session introuvable"));
            resultat.setSession(session);
        }

        resultat.setApprenti(apprenti);
        return resultatRepository.save(resultat);
    }

    public List<Resultat> getAllResultats() {
        return resultatRepository.findAll();
    }

    public List<Resultat> getNotesApprenti(Long idApprenti) {
        return resultatRepository.findByApprentiId(idApprenti);
    }

    public Resultat getResultatById(Long id) {
        return resultatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note introuvable"));
    }
}