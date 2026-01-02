package com.txlforma.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    public SecurityConfig() {
        System.out.println("🚨🚨🚨 LE FICHIER SECURITY CONFIG EST BIEN CHARGÉ ! 🚨🚨🚨");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Désactiver la protection CSRF pour les API POST
                .csrf(csrf -> csrf.disable())

                // 2. Activer l'authentification Basic (pour Postman)
                .httpBasic(Customizer.withDefaults())

                .authorizeHttpRequests(auth -> auth
                        // 3. OUVRIR LES PORTES PUBLIQUES
                        .requestMatchers("/api/auth/**").permitAll() // Inscription & Login
                        .requestMatchers("/api/formations/**").permitAll() // Catalogue (lecture)

                        // 4. PROTÉGER LA ZONE ADMIN
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")

                        // 5. TOUT LE RESTE NÉCESSITE UNE CONNEXION
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}