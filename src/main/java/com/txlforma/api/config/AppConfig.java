package com.txlforma.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Classe de configuration principale de l'application
 * Définit les beans Spring nécessaires au fonctionnement de l'application
 */
@Configuration
public class AppConfig {

    /**
     * Bean pour l'encodage des mots de passe
     *
     * Utilise l'algorithme BCrypt qui :
     * - Génère un salt aléatoire automatiquement
     * - Effectue plusieurs itérations de hachage (par défaut 10)
     * - Est résistant aux attaques par force brute
     * - Produit des hash de 60 caractères
     *
     * @return PasswordEncoder instance de BCryptPasswordEncoder
     *
     * Utilisation typique :
     * - Lors de l'inscription : passwordEncoder.encode(motDePasseClair)
     * - Lors de la connexion : passwordEncoder.matches(motDePasseSaisi, hashStocké)
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}