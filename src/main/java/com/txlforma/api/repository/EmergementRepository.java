package com.txlforma.api.repository;

import com.txlforma.api.model.Emergement;
import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergementRepository extends JpaRepository<Emergement, Long> {

    boolean existsByApprentiAndSession(Utilisateur apprenti, Session session);

    List<Emergement> findBySession(Session session);

    List<Emergement> findByApprenti(Utilisateur apprenti);

    List<Emergement> findByApprentiAndSession(Utilisateur apprenti, Session session);
}