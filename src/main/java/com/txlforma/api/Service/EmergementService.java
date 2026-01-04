package com.txlforma.api.Service;

import com.txlforma.api.model.Emergement;
import com.txlforma.api.repository.EmergementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmergementService {

    @Autowired
    private EmergementRepository emergementRepository;

    public List<Emergement> getAll() {
        return emergementRepository.findAll();
    }

    public Emergement save(Emergement emergement) {
        if (emergement.getDate() == null) {
            emergement.setDate(LocalDateTime.now());
        }
        return emergementRepository.save(emergement);
    }

    public void delete(Long id) {
        emergementRepository.deleteById(id);
    }
}