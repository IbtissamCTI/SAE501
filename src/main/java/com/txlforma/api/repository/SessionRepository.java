package com.txlforma.api.repository;

import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    // Permet de trouver les sessions d'un prof spécifique
    List<Session> findByIntervenant(Utilisateur intervenant);
}