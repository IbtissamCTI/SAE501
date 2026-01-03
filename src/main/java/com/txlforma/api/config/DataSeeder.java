package com.txlforma.api.config;

import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.repository.UtilisateurRepository;
import com.txlforma.api.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UtilisateurRepository userRepo;

    @Autowired
    private AuthService authService;

    @Override
    public void run(String... args) throws Exception {
        if (userRepo.count() == 0) {

            Utilisateur admin = new Utilisateur();
            admin.setNom("Boss");
            admin.setPrenom("Big");
            admin.setEmail("admin@txlforma.com");
            admin.setMotDePasse("admin123");

            authService.creerAdmin(admin);

            System.out.println("---------- 🚀 INITIALISATION BDD RÉUSSIE 🚀 ----------");
            System.out.println("Compte Admin créé : boss.big / admin123");
            System.out.println("------------------------------------------------------");
        }
    }
}