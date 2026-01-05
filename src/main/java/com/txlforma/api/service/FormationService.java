package com.txlforma.api.service;

import com.txlforma.api.model.Formation;
import com.txlforma.api.model.Session;
import com.txlforma.api.repository.FormationRepository;
import com.txlforma.api.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FormationService {

    @Autowired
    private FormationRepository formationRepo;

    @Autowired
    private SessionRepository sessionRepo;

    public List<Formation> getAllFormations() {
        return formationRepo.findAll();
    }

    public Optional<Formation> getFormationById(Long id) {
        return formationRepo.findById(id);
    }

    public List<Formation> getByCategorie(String cat) {
        return formationRepo.findByCategorie(cat);
    }

    public Formation creerFormation(Formation f) {
        return formationRepo.save(f);
    }

    public Session ajouterSession(Long idFormation, Session session) {
        Formation formation = formationRepo.findById(idFormation)
                .orElseThrow(() -> new RuntimeException("Formation introuvable"));

        session.setFormation(formation);
        return sessionRepo.save(session);
    }
}