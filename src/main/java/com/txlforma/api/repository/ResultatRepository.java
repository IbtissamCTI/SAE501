package com.txlforma.api.repository;

import com.txlforma.api.model.Resultat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultatRepository extends JpaRepository<Resultat, Long> {

    // Exemple de méthode utile : Trouver les notes d'un apprenti spécifique
    List<Resultat> findByApprentiId(Long idApprenti);

    // Exemple : Trouver les notes d'une session
    // List<Resultat> findBySessionId(Long idSession);
}