# Document de Conception Produit (PRD) — TimeTravel Agency

## 1. Vision du Projet
**TimeTravel Agency** est une plateforme web interactive haut de gamme permettant de découvrir et réserver des voyages à travers le temps. L'objectif est d'offrir une expérience utilisateur immersive, mêlant esthétique moderne et intelligence artificielle pour guider le voyageur.

---

## 2. Objectifs Stratégiques
- **Immersion** : Utiliser des visuels forts et des animations (GSAP) pour simuler le voyage temporel.
- **Assistance IA** : Intégrer un agent conversationnel expert pour conseiller les clients.
- **Conversion** : Faciliter la découverte des destinations et la planification via une interface intuitive.

---

## 3. Analyse du Design (Inspiration : `exemple.png`)
Basé sur la maquette fournie, l'UI adoptera les codes suivants :
- **Layout** : Structure épurée avec une forte hiérarchie visuelle.
- **Hero Section** : Titre massif, barre de recherche de "Destination Temporelle" intégrée, et visuel d'arrière-plan immersif.
- **Cards** : Utilisation de cartes avec effets de survol (hover) pour les destinations (Paris 1889, Crétacé, Florence 1504).
- **Statistiques** : Section "L'agence en chiffres" (ex: 234M d'années couvertes, 5.0 étoiles de satisfaction).
- **Social Proof** : Section avis clients et FAQ interactive.
- **Palette de Couleurs** : Thème sombre (Dark Mode) avec des accents élégants (Or/Doré ou Vert néon selon l'ambiance luxe/moderne).

---

## 4. Spécifications Fonctionnelles

### 4.1. Core Features
- **Exploration Temporelle** : Galerie interactive des 3 époques avec détails historiques.
- **Agent Conversationnel (Chatbot)** : 
    - Personnalité : Expert historien, chaleureux et professionnel.
    - Technologie : Mistral AI via Vercel AI SDK.
- **Système de Réservation** : Formulaire permettant de choisir une époque et une période de séjour.

### 4.2. Expérience Utilisateur (UX) & Animations
- **GSAP** : 
    - Parallaxe au scroll sur les sections.
    - Révélation progressive des textes (SplitText effect).
    - Transitions fluides entre les sections.
- **Responsive** : Design mobile-first optimisé pour tablettes et smartphones.

---

## 5. Spécifications Techniques

### 5.1. Stack Logicielle
- **Frontend** : React.js (Vite)
- **Styling** : Tailwind CSS (pour la rapidité et la cohérence)
- **Animations** : GSAP (GreenSock Animation Platform)
- **IA/LLM** : Mistral AI (API)
- **Infrastructure SDK** : Vercel AI SDK

### 5.2. Architecture des Données (Destinations)
1.  **Paris 1889** : Thème Belle Époque, Exposition Universelle.
2.  **Crétacé (-65M)** : Thème Aventure, Nature sauvage, Dinosaures.
3.  **Florence 1504** : Thème Renaissance, Art, Léonard de Vinci.

---

## 6. Roadmap de Développement

1.  **Phase 1 : Fondations** (Setup Vite, Tailwind, GSAP).
2.  **Phase 2 : UI/UX** (Intégration du layout inspiré de `exemple.png`).
3.  **Phase 3 : Intelligence Artificielle** (Connexion API Mistral et UI du Chatbot).
4.  **Phase 4 : Peaufinage** (Animations GSAP complexes et optimisation mobile).
5.  **Phase 5 : Déploiement** (Vercel).

---

## 7. Critères de Succès
- Temps de chargement inférieur à 2s.
- Score d'accessibilité élevé.
- Interaction fluide avec le chatbot (réponses pertinentes en moins de 1s).
