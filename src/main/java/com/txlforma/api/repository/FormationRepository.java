package com.txlforma.api.repository;

import com.txlforma.api.model.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FormationRepository extends JpaRepository<Formation, Long> {
    // Permet de filtrer par catégorie (ex: "Réseaux")
    List<Formation> findByCategorie(String categorie);
}