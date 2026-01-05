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

        // 1. CRÉATION DE L'ADMIN (Identifiants : admin.amdin / test123)
        if (userRepo.count() == 0) {
            Utilisateur admin = new Utilisateur();
            admin.setNom("Admin");
            admin.setPrenom("Amdin");
            admin.setEmail("admin@txlforma.com");
            admin.setMotDePasse("test123");
            authService.creerAdmin(admin);
            System.out.println("✅ Admin créé : admin.amdin");
        }

        // 2. IMPORTATION DE TOUS LES COURS DÉTAILLÉS
        if (formationRepo.count() == 0) {
            formationRepo.saveAll(Arrays.asList(
                    // --- CATEGORIE FRONT-END ---
                    new Formation(
                            "React.js", "front",
                            "Maîtrisez la bibliothèque N°1. Hooks, Context API et Redux.",
                            "Maîtriser les Hooks (useState, useEffect)\nComprendre la Context API\nArchitecture Redux Toolkit",
                            "Maîtrise de JavaScript moderne (ES6+)\nBases de HTML/CSS",
                            "Module 1: Fondamentaux de React\nModule 2: Hooks et gestion d'état\nModule 3: Routage et Navigation\nModule 4: Gestion d'état globale\nModule 5: Projet final",
                            35, "Expert", 1490.0
                    ),
                    new Formation(
                            "Vue.js", "front",
                            "Le framework progressif. Composition API et performance.",
                            "Maîtriser la Composition API\nGestion d'état avec Pinia\nPerformance et Optimisation",
                            "Bonnes connaissances en JavaScript",
                            "Module 1: Directives et Options API\nModule 2: Composition API\nModule 3: Vue Router et Pinia\nModule 4: Composants avancés\nModule 5: Déploiement",
                            35, "Intermédiaire", 1290.0
                    ),

                    // --- CATEGORIE BACK-END ---
                    new Formation(
                            "Java / Spring", "back",
                            "Standard industriel. Microservices robustes.",
                            "Inversion de contrôle (IoC)\nSécurité avec Spring Security\nPersistance avec Hibernate/JPA",
                            "Bases de la programmation orientée objet (Java)",
                            "Module 1: Spring Boot Core\nModule 2: Spring Data JPA\nModule 3: Spring Security et JWT\nModule 4: Architecture Microservices\nModule 5: Tests unitaires",
                            35, "Expert", 1590.0
                    ),
                    new Formation(
                            "Node.js", "back",
                            "JS côté serveur. API REST rapides avec Express.",
                            "Programmation asynchrone\nCréation d'APIs RESTful\nAuthentification JWT",
                            "Maîtrise de JavaScript",
                            "Module 1: Architecture Node.js\nModule 2: Framework Express\nModule 3: MongoDB et Mongoose\nModule 4: Sécurisation API\nModule 5: Temps réel avec Socket.io",
                            35, "Avancé", 1390.0
                    ),

                    // --- CATEGORIE DEVOPS ---
                    new Formation(
                            "Docker", "devops",
                            "Conteneurisation pour déploiement fluide.",
                            "Création d'images optimisées\nOrchestration Docker Compose\nGestion des réseaux et volumes",
                            "Bases de la ligne de commande Linux",
                            "Module 1: Concepts des containers\nModule 2: Dockerfile et Images\nModule 3: Docker Compose\nModule 4: CI/CD avec Docker\nModule 5: Sécurité des images",
                            21, "Avancé", 990.0
                    ),
                    new Formation(
                            "AWS Cloud", "devops",
                            "Cloud leader. EC2, S3 et Serverless.",
                            "Gestion des instances EC2\nStockage S3\nFonctions Lambda (Serverless)",
                            "Notions de réseau et serveurs",
                            "Module 1: Introduction au Cloud\nModule 2: EC2 et VPC\nModule 3: Stockage et Bases de données\nModule 4: Serverless Computing\nModule 5: Sécurité (IAM)",
                            35, "Expert", 1690.0
                    )
            ));
            System.out.println("✅ Tous les cours détaillés ont été importés avec succès !");
        }
    }
}