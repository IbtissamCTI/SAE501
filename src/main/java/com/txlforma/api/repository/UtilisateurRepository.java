package com.txlforma.api.repository;

import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByPseudo(String pseudo);

    List<Utilisateur> findByRole(Role role);
}