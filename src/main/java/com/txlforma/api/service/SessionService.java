package com.txlforma.api.service; // Correction: minuscule 'service'

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

    public Session updateSession(Long idSession, Session nouvellesInfos, Long idProf) {
        Session session = sessionRepo.findById(idSession)
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

    public void deleteSession(Long id) {
        sessionRepo.deleteById(id);
    }

    public List<Session> getPlanningIntervenant(Long idIntervenant) {
        Utilisateur prof = userRepo.findById(idIntervenant)
                .orElseThrow(() -> new RuntimeException("Intervenant introuvable"));
        return sessionRepo.findByIntervenant(prof);
    }
}