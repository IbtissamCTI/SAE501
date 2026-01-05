package com.txlforma.api.repository;

import com.txlforma.api.model.Emergement;
import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergementRepository extends JpaRepository<Emergement, Long> {

    // NOUVEAU : Permet de vérifier si une signature existe déjà pour ce couple (apprenti, session)
    boolean existsByApprentiAndSession(Utilisateur apprenti, Session session);
}