package com.txlforma.api.repository;

import com.txlforma.api.model.Emergement;
import com.txlforma.api.model.Session;
import com.txlforma.api.model.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour la gestion des émargements
 */
@Repository
public interface EmergementRepository extends JpaRepository<Emergement, Long> {

    /**
     * Vérifie si un apprenti a déjà émargé pour une session
     *
     * @param apprenti L'apprenti
     * @param session La session
     * @return true si l'émargement existe, false sinon
     */
    boolean existsByApprentiAndSession(Utilisateur apprenti, Session session);

    /**
     * Récupère tous les émargements d'une session
     *
     * @param session La session
     * @return Liste des émargements
     */
    List<Emergement> findBySession(Session session);

    /**
     * Récupère tous les émargements d'un apprenti
     *
     * @param apprenti L'apprenti
     * @return Liste des émargements
     */
    List<Emergement> findByApprenti(Utilisateur apprenti);

    /**
     * Récupère tous les émargements d'un apprenti pour une session spécifique
     *
     * @param apprenti L'apprenti
     * @param session La session
     * @return Liste des émargements (normalement 0 ou 1)
     */
    List<Emergement> findByApprentiAndSession(Utilisateur apprenti, Session session);
}