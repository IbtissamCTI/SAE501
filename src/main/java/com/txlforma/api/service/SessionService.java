package com.txlforma.api.service;

import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.model.Formation;
import com.txlforma.api.repository.SessionRepository;
import com.txlforma.api.repository.UtilisateurRepository;
import com.txlforma.api.repository.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SessionService {

    @Autowired private SessionRepository sessionRepo;
    @Autowired private UtilisateurRepository userRepo;
    @Autowired private FormationRepository formationRepo;

    public List<Session> getAllSessions() {
        return sessionRepo.findAll();
    }

    public Session creerSession(Session s, Long idFormation) {
        Formation f = formationRepo.findById(idFormation)
                .orElseThrow(() -> new RuntimeException("Formation introuvable"));
        s.setFormation(f);
        return sessionRepo.save(s);
    }

    public Session updateSession(Long idSession, Session nouvellesInfos, Long idProf) {
        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));

        if(nouvellesInfos.getSalle() != null) session.setSalle(nouvellesInfos.getSalle());
        if(nouvellesInfos.getLieu() != null) session.setLieu(nouvellesInfos.getLieu());
        if(nouvellesInfos.getHoraires() != null) session.setHoraires(nouvellesInfos.getHoraires());
        if(nouvellesInfos.getDateDebut() != null) session.setDateDebut(nouvellesInfos.getDateDebut());
        if(nouvellesInfos.getDateFin() != null) session.setDateFin(nouvellesInfos.getDateFin());

        if(idProf != null) {
            Utilisateur prof = userRepo.findById(idProf)
                    .orElseThrow(() -> new RuntimeException("Prof introuvable"));
            session.setIntervenant(prof);
        }
        return sessionRepo.save(session);
    }

    public void inscrireApprenti(Long idSession, Long idApprenti) {
        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));
        Utilisateur apprenti = userRepo.findById(idApprenti)
                .orElseThrow(() -> new RuntimeException("Apprenti introuvable"));

        if (!session.getParticipants().contains(apprenti)) {
            session.addParticipant(apprenti);
            sessionRepo.save(session);
        } else {
            throw new RuntimeException("Déjà inscrit à cette session !");
        }
    }

    public List<Session> getPlanningIntervenant(Long idIntervenant) {
        Utilisateur intervenant = userRepo.findById(idIntervenant)
                .orElseThrow(() -> new RuntimeException("Intervenant introuvable"));
        return sessionRepo.findByIntervenant(intervenant);
    }

    public List<Session> getSessionsPourApprenti(Long idApprenti) {
        return sessionRepo.findSessionsByParticipantId(idApprenti);
    }

    public void deleteSession(Long id) {
        sessionRepo.deleteById(id);
    }
}