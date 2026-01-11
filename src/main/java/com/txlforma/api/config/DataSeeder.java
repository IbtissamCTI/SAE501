package com.txlforma.api.config;

import com.txlforma.api.model.Formation;
import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.repository.FormationRepository;
import com.txlforma.api.repository.UtilisateurRepository;
import com.txlforma.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired private UtilisateurRepository userRepo;
    @Autowired private FormationRepository formationRepo;
    @Autowired private AuthService authService;

    @Override
    public void run(String... args) throws Exception {

        if (userRepo.count() == 0) {
            Utilisateur admin = new Utilisateur();
            admin.setNom("Admin");
            admin.setPrenom("Amdin");
            admin.setEmail("admin@txlforma.com");
            admin.setMotDePasse("test123");
            authService.creerAdmin(admin);
            System.out.println(" Admin créé : admin.amdin");
        }
    }
}