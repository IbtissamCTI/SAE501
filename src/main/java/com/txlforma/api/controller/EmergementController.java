package com.txlforma.api.controller;

import com.txlforma.api.Service.EmergementService;
import com.txlforma.api.model.Emergement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergement")
@CrossOrigin("*")
public class EmergementController {

    @Autowired
    private EmergementService emergementService;

    @GetMapping
    public List<Emergement> getAll() {
        return emergementService.getAll();
    }

    @PostMapping
    public Emergement create(@RequestBody Emergement emergement) {
        return emergementService.save(emergement);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        emergementService.delete(id);
    }
}