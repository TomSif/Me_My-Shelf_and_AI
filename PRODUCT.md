# PRODUCT.md — Me My Shelf and AI

> Vision produit, roadmap et backlog.
> Ce fichier évolue à chaque session. Il dit ce qu'on construit, pourquoi, et dans quel ordre.

---

## Vision

Application personnelle de gestion de collection de parfums.

**Objectif premier** : avoir un outil utile au quotidien, fait maison.
**Objectif second** : vitrine de bonnes pratiques pour les recruteurs — workflow git professionnel,
évolution progressive et documentée, architecture qui tient dans la durée.

## Note de design — mode paysage

L'expérience étagère (v2) est conçue pour le mode paysage uniquement.
Une étagère se parcourt horizontalement — c'est son sens naturel.
v0 et v1 restent mobile-first portrait. La contrainte paysage
n'entre en jeu qu'avec la navigation spatiale.

### Ce que ce projet montre (aux recruteurs)

- Workflow git pro : branches, commits atomiques, issues, PR, merges
- Capacité à faire évoluer un projet (v0 → v1 → v2), pas juste à le livrer une fois
- Prise de décision d'architecture sur un projet perso sans contrainte externe
- Maintenir un projet dans la durée

---

## Stack

| Version | Stack                                                      |
| ------- | ---------------------------------------------------------- |
| v0      | React + TypeScript + Tailwind CSS v4 + Vite + localStorage |
| v1      | + Supabase (BDD cloud)                                     |
| v2      | + Auth utilisateur + partage collection                    |

### Modèle de données

``typescript
type OlfactoryFamily =
| "hespéridé" | "floral" | "herbacé" | "épicé"
| "gourmand" | "boisé" | "résineux" | "musqué"
| "alcoolisé" | "minéral" | "artificiel" | "indéfini"

type Season = "printemps" | "été" | "automne" | "hiver"

type Concentration =
| "cologne" | "eau de toilette" | "eau de parfum"
| "parfum" | "extrait"

interface Fragrance {
id: string
name: string
brand: string
perfumer?: string
concentration: Concentration

isSample: boolean
volumeMl: number // contenance flacon neuf
remainingMl: number // quantité restante, saisie manuelle en v0

purchaseDate?: string
purchasePrice?: number
lastUsed?: string

families: OlfactoryFamily[]
seasons: Season[]

rating?: 1 | 2 | 3 | 4 | 5
comment?: string

createdAt: string
}

---

## Roadmap

| Version | Périmètre                                                                       | Horizon   |
| ------- | ------------------------------------------------------------------------------- | --------- |
| **v0**  | CRUD basique — ajouter / voir / supprimer un parfum (nom, marque, notes libres) | Mai 2026  |
| **v1**  | Filtres, recherche, UI soignée, responsive, persistance cloud (Supabase)        | Juin 2026 |
| **v2**  | Auth utilisateur, partage de collection, fonctionnalités avancées               | Juillet+  |

---

## Règles du projet

- **Une feature propre vaut mieux que trois bâclées** — ne pas rusher
- **Chaque feature = une issue GitHub + une branche + une PR + un merge**
- **FM continue en parallèle** pour apprendre — Fragrances-Companion c'est pour pratiquer et montrer
- **Le backlog est sacré** : une idée hors scope = elle va dans le backlog, elle n'entre pas dans la version en cours

---

## Issues v0 — à créer sur GitHub

> Copier-coller chaque bloc pour créer les issues sur le repo.

---

### Issue #1 — Setup projet

**Titre** : `setup: initialiser le projet React + TS + Tailwind`

**Description** :
Mettre en place la base technique du projet.

**Critères d'acceptance** :

- [ ] `npm create vite` avec template React + TypeScript
- [ ] Tailwind CSS v4 installé et fonctionnel
- [ ] Structure de dossiers posée (`/components`, `/types`, `/hooks`, `/utils`)
- [ ] README initial rédigé (description projet + stack + intentions)
- [ ] Premier commit sur `main`, branche `dev` créée

**Branche** : `setup/init`

---

### Issue #2 — Modèle de données

**Titre** : `feat: définir les types Fragrance`

**Description** :
Définir tous les types TypeScript du projet avant de coder quoi que ce soit d'autre.
Ce modèle est le contrat de l'application — il ne doit pas changer une fois posé.

**Critères d'acceptance** :

- [ ] Types `OlfactoryFamily`, `Season`, `Concentration` définis dans `/types/fragrance.ts`
- [ ] Interface `Fragrance` complète avec tous les champs
- [ ] Tous les types exportés et utilisables dans les composants

**Branche** : `feat/fragrance-type`

---

### Issue #3 — Ajouter un parfum

**Titre** : `feat: formulaire d'ajout d'un parfum`

**Description** :
Permettre à l'utilisateur d'ajouter un parfum à sa collection via un formulaire.

**Critères d'acceptance** :

- [ ] Formulaire avec les champs : nom, marque, notes libres
- [ ] Validation minimale (nom obligatoire)
- [ ] Soumission déclenche l'ajout dans le state
- [ ] Formulaire se réinitialise après soumission

**Branche** : `feat/add-fragrance`

---

### Issue #4 — Afficher la liste

**Titre** : `feat: afficher la liste des parfums`

**Description** :
Afficher tous les parfums ajoutés dans une liste claire.

**Critères d'acceptance** :

- [ ] Liste des parfums affichée (nom + marque + notes)
- [ ] État vide géré (message si aucun parfum)
- [ ] Composant `FragranceCard` isolé et réutilisable

**Branche** : `feat/list-fragrances`

---

### Issue #5 — Supprimer un parfum

**Titre** : `feat: supprimer un parfum de la collection`

**Description** :
Permettre à l'utilisateur de supprimer un parfum de sa collection.

**Critères d'acceptance** :

- [ ] Bouton supprimer sur chaque carte
- [ ] Confirmation avant suppression (optionnel v0, à décider)
- [ ] Liste mise à jour immédiatement après suppression

**Branche** : `feat/delete-fragrance`

---

### Issue #6 — Persistance locale

**Titre** : `feat: persister la collection dans localStorage`

**Description** :
S'assurer que la collection survit au rechargement de la page.

**Critères d'acceptance** :

- [ ] Hook `useLocalStorage` créé (ou logique dans un hook `useFragrances`)
- [ ] Collection chargée depuis localStorage au montage
- [ ] Collection sauvegardée à chaque modification

**Branche** : `feat/local-storage`

---

## Backlog — idées pour v1+

> Ces idées sont bonnes. Elles n'entrent pas dans v0.

| Idée                                                                | Version cible |
| ------------------------------------------------------------------- | ------------- |
| Filtres par marque / famille olfactive                              | v1            |
| Recherche par nom                                                   | v1            |
| Upload photo du flacon                                              | v1            |
| Note personnelle /10                                                | v1            |
| Persistance cloud (Supabase)                                        | v1            |
| Famille olfactive (champ select)                                    | v1            |
| Estimation consommation automatique (0,5ml/utilisation × fréquence) | v1            |
| Moteur de recommandation par humeur / famille olfactive             | v1            |
| Intégration API météo → suggestion de parfum                        | v2            |
| Auth utilisateur                                                    | v2            |
| Partager sa collection (lien public)                                | v2            |
| Import/export CSV                                                   | v2            |

---

_Créé le 2026-04-30 — Projet démarré_
