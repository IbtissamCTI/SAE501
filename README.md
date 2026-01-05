# NOVATIO Plateforme de Gestion de Formation (LMS)

**Projet Universitaire - SAE 501** Digitalisation des processus administratifs et pédagogiques d'un centre de formation.

---

## Présentation du Projet

NOVATIO est une application web de gestion de centre de formation (Learning Management System). Ce projet répond à un besoin de modernisation des infrastructures existantes, couvrant l'intégralité du cycle de vie d'une formation : de l'inscription d'un apprenant jusqu'à la délivrance de son attestation de réussite.

L'application met l'accent sur la sécurité des transactions via une simulation de paiement, la gestion des droits utilisateurs et l'assiduité par un système d'émargement numérique.

### Objectifs Principaux
* Sécuriser l'accès aux formations via un flux de paiement.
* Automatiser le suivi des présences et la remontée des absences.
* Proposer des interfaces spécifiques pour les apprentis, les intervenants et les administrateurs.

---

## Équipe Projet

| Membre | Rôle Principal | Responsabilités Clés |
| :--- | :--- | :--- |
| **Ibtissam Chtioui** | Lead Developer Back-end | Architecture base de données et logique serveur. |
| **Hugo Goncalves** | Developer Back-end / Front-end | Développement des fonctionnalités et liaison des données. |
| **Assia Mahdjoub** | UI/UX Design / Developer Front-end | Design system, maquettes et intégration React. |
| **Ruben Pereira** | Dispositif interactif / 3D | Création d'assets visuels et immersion. |

---

## Stack Technique

* **Front-End :** React.js (Vite) et Tailwind CSS pour l'interface utilisateur.
* **Visualisation de données :** Bibliothèques Chart.js ou Recharts pour les statistiques.
* **Navigation :** React Router pour la gestion des accès par rôle.
* **Versionning :** Git et GitHub avec une organisation par branches (main et FRONT).

---

## Ressources et Suivi

* **Maquettes UI/UX :** https://www.figma.com/design/PMXJ0MDn51MYzCvH8guIBe/SAE-501?node-id=24-13&t=Eyv26rUpUAyPIlOF-1
* **Gestion de Projet :** https://trello.com/b/cemhFicr/sae-501
* **Hébergement :** ...

---

## Fonctionnalités Implémentées

Le projet respecte le cahier des charges fonctionnel de la SAE 501 :

### 1. Inscription et Connexion Sécurisée
* L'accès à la plateforme est restreint par authentification.
* Formulaires permettant de sauvegarder le nom, prénom, email, téléphone et entreprise.
* Distinction des rôles : Apprenti, Intervenant et Administrateur.

### 2. Paiement de la formation
* Aucune inscription n'est validée sans le règlement intégral de la formation.
* Interface simulant un module de paiement en ligne.

### 3. Suivi des absences et émargement numérique
* Mise en place d'un système de suivi automatique des absences.
* Les participants doivent émarger numériquement pour attester de leur présence durant les sessions.

### 4. Suivi des intervenants
* Tableau de bord permettant de suivre les interventions, le nombre d'heures réalisées et la spécialité.

### 5. Édition et analyse des résultats
* Graphiques statistiques trimestriels portant sur les effectifs totaux, le taux de réussite et le chiffre d'affaires.
* Génération d'attestations de succès ou de présence en format PDF à l'issue des formations.

---

## Structure des Données

Le projet s'appuie sur une base de données relationnelle structurée selon les entités suivantes :

* **Admin et Apprentie :** Gestion des profils utilisateurs.
* **Formation et Sessions :** Catalogue des cours et planification des dates.
* **InscripSessions et Paiement :** Suivi des inscriptions liées au statut du règlement.
* **Emergement et Resultat :** Collecte des données de présence et des notes obtenues.

---
##  État d'avancement & Challenges

*  **Architecture Front :** Mise en place d'une structure modulaire et réutilisable. (Terminé)
*  **Design :** Charte graphique "Néon" appliquée uniformément. (Terminé)
*  **Gestion Git :** Résolution complexe des conflits de fusion (Merge conflicts) entre le local et la branche distante. (terminé)
*  **Back-end :** Connexion API et persistance des données (En cours / Terminé).

---

## Remerciements

Nous remercions l’équipe pédagogique pour leur encadrement sur ce module SAE 501, ainsi que pour les ressources mises à disposition.
## Installation Locale

1. **Cloner le dépôt :**
   ```bash
   git clone [INSERER ICI L'URL DE VOTRE DEPOT GITHUB]
