package com.txlforma.api.service;

import com.txlforma.api.model.Utilisateur;
import com.txlforma.api.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service personnalisé pour la gestion des détails utilisateurs
 *
 * Implémente UserDetailsService de Spring Security pour permettre
 * l'authentification basée sur les données de la base de données
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    /**
     * Repository pour accéder aux données des utilisateurs
     * Injection automatique par Spring
     */
    @Autowired
    private UtilisateurRepository repository;

    /**
     * Charge les détails d'un utilisateur par son nom d'utilisateur (pseudo)
     *
     * Cette méthode est appelée automatiquement par Spring Security lors de :
     * - La tentative de connexion d'un utilisateur
     * - La validation d'un token JWT
     * - Toute opération nécessitant les détails de l'utilisateur authentifié
     *
     * @param username Le pseudo de l'utilisateur (identifiant unique)
     * @return UserDetails L'objet Utilisateur qui implémente UserDetails
     * @throws UsernameNotFoundException Si l'utilisateur n'existe pas en base
     *
     * Flux d'exécution :
     * 1. Recherche l'utilisateur dans la base via son pseudo
     * 2. Si trouvé : retourne l'objet Utilisateur (qui implémente UserDetails)
     * 3. Si non trouvé : lance une exception UsernameNotFoundException
     *
     * Note : L'objet Utilisateur doit implémenter l'interface UserDetails
     * pour fournir les informations d'authentification (mot de passe, rôles, etc.)
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByPseudo(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));
    }
}