package com.txlforma.api.repository;

import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    // Récupère les sessions par ID de l'apprenti (via la table de jointure)
    @Query("SELECT s FROM Session s JOIN s.participants p WHERE p.id = :userId ORDER BY s.dateDebut ASC")
    List<Session> findSessionsByParticipantId(@Param("userId") Long userId);

    // Récupère les sessions par intervenant
    List<Session> findByIntervenant(Utilisateur intervenant);
}