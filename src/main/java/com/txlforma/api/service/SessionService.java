package com.txlforma.api.service;

import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.repository.SessionRepository;
import com.txlforma.api.repository.UtilisateurRepository;
import com.txlforma.api.repository.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.time.LocalDate;

import org.springframework.security.access.prepost.PreAuthorize;

import java.time.LocalDate; // AJOUT INDISPENSABLE
import java.util.List;

@Service
public class SessionService {

    @Autowired private SessionRepository sessionRepo;
    @Autowired private UtilisateurRepository userRepo;
    @Autowired private FormationRepository formationRepo;

    public Session creerSession(Session s, Long idFormation) {
        com.txlforma.api.model.Formation f = formationRepo.findById(idFormation)
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

        if(idProf != null) {
            Utilisateur prof = userRepo.findById(idProf)
                    .orElseThrow(() -> new RuntimeException("Prof introuvable"));
            session.setIntervenant(prof);
        }
        return sessionRepo.save(session);
    }

    // ✅ MÉTHODE STATUT CORRIGÉE
    public String calculerStatut(Session s) {
        LocalDate aujourdhui = LocalDate.now();
        // On vérifie que dateFin n'est pas nulle pour éviter un crash
        if (s.getDateFin() != null && s.getDateFin().isBefore(aujourdhui)) {
            return "FINI";
        }
        return "EN COURS / A VENIR";
    }

    public void deleteSession(Long id) {
        sessionRepo.deleteById(id);
    }

    public List<Session> getPlanningIntervenant(Long idIntervenant) {
        Utilisateur prof = userRepo.findById(idIntervenant)
                .orElseThrow(() -> new RuntimeException("Intervenant introuvable"));
        return sessionRepo.findByIntervenant(prof);
    }

    public void inscrireApprenti(Long idSession, Long idApprenti) {
        Session session = sessionRepo.findById(idSession)
                .orElseThrow(() -> new RuntimeException("Session introuvable"));
        Utilisateur apprenti = userRepo.findById(idApprenti)
                .orElseThrow(() -> new RuntimeException("Apprenti introuvable"));

        if (!session.getParticipants().contains(apprenti)) {
            session.getParticipants().add(apprenti);
            sessionRepo.save(session);
        } else {
            throw new RuntimeException("Déjà inscrit à cette session !");
        }
    }
}