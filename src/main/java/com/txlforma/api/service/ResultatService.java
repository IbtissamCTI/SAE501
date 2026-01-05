package com.txlforma.api.service;

import com.txlforma.api.model.Resultat;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.model.Session;
import com.txlforma.api.repository.ResultatRepository;
import com.txlforma.api.repository.UtilisateurRepository;
import com.txlforma.api.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResultatService {

    @Autowired private ResultatRepository resultatRepository;
    @Autowired private UtilisateurRepository utilisateurRepository;
    @Autowired private SessionRepository sessionRepository;

    public Resultat ajouterNote(Resultat resultat, Long idApprenti, Long idSession) {
        Utilisateur apprenti = utilisateurRepository.findById(idApprenti)
                .orElseThrow(() -> new RuntimeException("Apprenti introuvable avec l'ID " + idApprenti));

        // Optionnel : Lier à une session si besoin
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