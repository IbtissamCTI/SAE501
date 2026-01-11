package com.txlforma.api.repository;

import com.txlforma.api.model.Apprentie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApprentieRepository extends JpaRepository<Apprentie, Long> {
    Optional<Apprentie> findByEmail(String email);
}