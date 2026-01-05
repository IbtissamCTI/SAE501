package com.txlforma.api.service;

import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.repository.SessionRepository;
import com.txlforma.api.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SessionService {

    @Autowired private SessionRepository sessionRepo;
    @Autowired private UtilisateurRepository userRepo;

    // Mise à jour par l'Admin
    public Session updateSession(Long id, Session nouvellesInfos, Long idProf) {
        Session session = sessionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        if(nouvellesInfos.getSalle() != null) session.setSalle(nouvellesInfos.getSalle());
        if(nouvellesInfos.getLieu() != null) session.setLieu(nouvellesInfos.getLieu());
        if(nouvellesInfos.getHoraires() != null) session.setHoraires(nouvellesInfos.getHoraires());

        if(idProf != null) {
            Utilisateur prof = userRepo.findById(idProf)
                    .orElseThrow(() -> new RuntimeException("Prof introuvable"));
            session.setIntervenant(prof);
        }
        return sessionRepo.save(session);
    }

    public void deleteSession(Long id) { sessionRepo.deleteById(id); }

    // Planning pour l'Intervenant
    public List<Session> getPlanningIntervenant(Long idInt) {
        Utilisateur prof = userRepo.findById(idInt)
                .orElseThrow(() -> new RuntimeException("Intervenant introuvable"));
        return sessionRepo.findByIntervenant(prof);
    }

    // Inscription pour l'Apprenti
    public void inscrireApprenti(Long idSession, Long idApprenti) {
        Session s = sessionRepo.findById(idSession).orElseThrow();
        Utilisateur a = userRepo.findById(idApprenti).orElseThrow();

        if (!s.getParticipants().contains(a)) {
            s.getParticipants().add(a);
            sessionRepo.save(s);
        }
    }
}