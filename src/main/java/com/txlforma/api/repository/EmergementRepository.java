package com.txlforma.api.repository;

import com.txlforma.api.model.Emergement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergementRepository extends JpaRepository<Emergement, Long> {
}