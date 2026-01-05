package com.txlforma.api.repository;

import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    // ✅ Recherche les sessions d'un intervenant spécifique
    List<Session> findByIntervenant(Utilisateur intervenant);
}


