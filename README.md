# WedConnect

**WedConnect** est une application web permettant de mettre en relation les marié(e)s et les prestataires de services pour l’organisation de mariages.  
L’objectif est simple : faciliter la recherche, la réservation et la gestion des prestataires tout en offrant aux professionnels une vitrine efficace.

---

## Fonctionnalités principales

### Onboarding Marié(e)s
1. Inscription
    - Nom du couple
    - Numéro de téléphone
    - Email + mot de passe
2. Accès au tableau de bord après inscription

### Onboarding Prestataire
1. Inscription rapide (obligatoire)
    - Email
    - Mot de passe
    - Nom de l’entreprise / personne
    - Catégorie(s) de service (au moins une, choix multiples + option "autre")
2. Accès immédiat à la plateforme
3. Complétion du profil (avant publication)
    - Logo / photo
    - Localisation (ville + code postal)
    - Description (optionnelle)
    - Tarifs pour chaque service (champ libre ou fourchette)
    - Galerie photos (3–5 max)
    - Liens réseaux sociaux (Facebook / Instagram)

> ⚠️ Si profil incomplet → rappel affiché :  
> « Complétez votre profil pour apparaître dans les recherches et recevoir des demandes. »

4. Publication du profil
    - Action : bouton **Publier mon profil**
    - Début d’une période d’essai (ex. 15 jours, sans carte de crédit)
    - À la fin de l’essai, le profil devient invisible sauf si le prestataire s’abonne
    - Si un prestataire est déjà booké pendant son essai, le lien avec les mariés reste actif même après expiration

---

## Tableau de bord Marié(e)s

- **Profil**
    - Modification des infos de base
    - Changement de mot de passe
- **Recherche prestataires**
    - Filtre par localisation
    - Filtres par services proposés (choix multiples)
- **Notre mariage**
    - Définition du lieu du mariage
    - Gestion des services sauvegardés
        - Statut : `sauvegardé` / `en attente` / `réservé`
        - Suppression possible
- **Favoris**
    - Liste de prestataires sauvegardés
- **Consultation d’un profil prestataire**
    - Ajouter en favoris
    - Sauvegarder un service dans le mariage

---

## Tableau de bord Prestataire

- **Profil**
    - Modifications infos (nom entreprise, logo, localisation, description, liens sociaux)
    - Changement de mot de passe
- **Services**
    - Ajouter / modifier / supprimer un service
    - Catégorie (liste déroulante + option personnalisée)
    - Description et photos (optionnel)
    - Tarifs (champ libre)
- **Réservations**
    - Liste des demandes reçues
    - Gestion des statuts (`en attente`, `accepté`, `refusé`, `annulé`)
- **Abonnement (à venir)**
    - Gestion et suivi de l’essai gratuit et des abonnements futurs

---

## Modération

- Restriction sur le bouton **Demander la réservation** si un couple a déjà réservé **5 prestataires au cours des 2 dernières heures** (anti-spam).

---

## Notes externes

- La visibilité des profils dépend aussi de la promotion externe (réseaux sociaux, bouche-à-oreille, etc.).
- Objectif du MVP : **simple mise en relation** entre marié(e)s et prestataires.

---

## Roadmap MVP

- Onboarding mariés / prestataires
- Création et publication de profils prestataires
- Sauvegarde et gestion des services par les mariés
- Système de réservation avec statuts
- Modération anti-spam basique
- Gestion des abonnements prestataires  
