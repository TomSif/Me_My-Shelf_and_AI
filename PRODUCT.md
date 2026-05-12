# PRODUCT.md — Me My Shelf and AI

> Vision produit, roadmap et backlog.
> Ce fichier évolue à chaque session. Il dit ce qu'on construit, pourquoi, et dans quel ordre.

---

## Vision

Application personnelle de gestion de collection de parfums.

**Objectif premier** : avoir un outil utile au quotidien, fait maison.
**Objectif second** : vitrine de bonnes pratiques pour les recruteurs — workflow git professionnel,
évolution progressive et documentée, architecture qui tient dans la durée.

### Ce que ce projet montre (aux recruteurs)

- Workflow git pro : branches, commits atomiques, issues, PR, merges
- Capacité à faire évoluer un projet (v0 → v1 → v2), pas juste à le livrer une fois
- Prise de décision d'architecture sur un projet perso sans contrainte externe
- Maintenir un projet dans la durée

---

## Stack

| Version | Stack                                                          |
| ------- | -------------------------------------------------------------- |
| v0      | React + TypeScript + Tailwind CSS v4 + Vite + localStorage     |
| v1      | React Router + logique métier complète + localStorage          |
| v2      | + Supabase (BDD cloud) + Auth utilisateur + partage collection |

---

## Vision design — l'étagère comme espace

> Ce document de référence capture les décisions visuelles et UX prises lors des sessions de design.
> Il sert de boussole pour la passe UI (issue #19) et la v2.

---

### Principe fondateur

**L'app, c'est l'étagère.** Pas l'IA, pas les filtres, pas les stats — l'étagère.
Tout le reste est un outil au service de la navigation dans la collection.
Ce principe gouverne toutes les décisions de hiérarchie visuelle et de layout.

---

### Direction artistique

**Mots-clés** : minimal luxury · clean · fresh · uplifting · lumière

L'interface ne simule pas une étagère en bois avec des planches.
C'est la **lumière** qui crée la structure — pas les bordures, pas les lignes.
Fond crème chaud (`#FAF8F5` ou proche), typographie sobre, beaucoup d'espace négatif.

---

### Les flacons

Les flacons sont dessinés en **trait fin et transparent** — le contenant est neutre.
C'est le **liquide à l'intérieur** qui porte la couleur et donc l'identité de la famille olfactive.
Pas d'étiquette de couleur séparée : le parfum est son propre label visuel.

**Palette par famille olfactive** (couleur du liquide) :

| Famille    | Couleur              | Hex indicatif |
| ---------- | -------------------- | ------------- |
| Hespéridé  | Jaune doré lumineux  | `#F5C842`     |
| Floral     | Rose poudré          | `#E8A0B4`     |
| Boisé      | Ambré profond        | `#B5763A`     |
| Oriental   | Brun épicé chaud     | `#8B4513`     |
| Gourmand   | Caramel doux         | `#D4956A`     |
| Herbacé    | Vert clair végétal   | `#9DC88D`     |
| Musqué     | Beige rosé nude      | `#D4B8A8`     |
| Résineux   | Ambre foncé          | `#7A5230`     |
| Épicé      | Rouge orangé profond | `#C45E3E`     |
| Minéral    | Gris bleuté froid    | `#A0B4C0`     |
| Alcoolisé  | Transparent doré     | `#E8D5A3`     |
| Artificiel | Violet électrique    | `#9B72CF`     |
| Indéfini   | Gris neutre          | `#C8C8C8`     |

> Ces valeurs sont indicatives. La passe UI (#19) les affinera sur de vrais flacons rendus.

---

### La navigation par étages

**Un critère de groupement = une organisation d'étages.**
L'utilisateur choisit comment il range sa collection : par famille olfactive, par marque,
par saison, par concentration. Changer de critère réorganise physiquement les étages.
Ce n'est pas un filtre qui masque — c'est une nouvelle façon de parcourir.

**Proportion des étages visibles simultanément :**

- 1 étage actif — pleinement éclairé, au centre
- 1 étage partiellement visible au-dessus — on ne voit que le bas des flacons
- 1 étage partiellement visible en dessous — on ne voit que le haut des flacons

Cette fenêtre à 3 étages (1 + 2 tronqués) incite naturellement à naviguer
sans surcharger l'écran. Les étages adjacents assombris créent le contraste
qui oriente le regard.

**Éclairage de l'étage actif :**

- Fond légèrement plus chaud et plus lumineux que les étages adjacents
- Overlay sombre et froid sur les étages non-actifs (pas du gris — une teinte froide
  pour amplifier le contraste chaud/froid)
- Spots encastrés dans le plafond de l'étagère — radial gradients simulant des sources
  lumineuses ponctuelles qui tombent sur les flacons ("lumière de théâtre", suiveuse)

**Règle des spots — importante :**
Les spots ne s'allument que sur l'étage actif. Sur les étages adjacents ils sont éteints
ou écrasés par l'overlay. Concrètement deux classes CSS :

- `.shelf--active` : spots allumés, pas d'overlay, fond chaud
- `.shelf--dim` : spots désactivés, overlay froid semi-transparent par-dessus tout le contenu

L'overlay de `.shelf--dim` passe au-dessus des spots pour les éteindre — pas en dessous.

**Règle de tronquage des flacons :**
La planche d'étagère coupe les flacons des étages adjacents au niveau de la base —
on ne voit que les bouchons et les épaules, pas le corps du flacon.
Si la planche coupe au milieu du flacon, le tronquage est trop bas.

**Typographie des titres d'étage :**
Chaque famille a sa couleur propre dans son titre (HESPÉRIDÉ en doré, FLORAL en rose, etc.)
Le titre de l'étage inactif est atténué (opacité réduite), celui de l'étage actif
est en pleine valeur.

---

### Architecture de l'interface — zones fixes

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                  │
│  Logo · Barre de recherche · Filtres · Suggestions · +  │
├──────┬──────────────────────────────────────────────────┤
│      │  Étage N-1 (tronqué, assombri — bas des flacons) │
│ NAV  ├──────────────────────────────────────────────────┤
│      │  Étage N   (actif, éclairé, flacons complets)    │
│ GAUCHE├─────────────────────────────────────────────────┤
│      │  Étage N+1 (tronqué, assombri — haut des flacons)│
├──────┴──────────────────────────────────────────────────┤
│  BARRE DE NAVIGATION RAPIDE (bas, fixe)                  │
│  ↑↓ Changer d'étage · ←→ Naviguer · Entrée Ouvrir fiche │
└─────────────────────────────────────────────────────────┘
```

**Navigation gauche** : icônes seules, compacte.
Étagères · Filtres · Favoris · Stats · Réglages.
Elle ne vole jamais la vedette au contenu.

**Barre de navigation rapide (bas, fixe)** :
Raccourcis clavier affichés en permanence.
Ancre l'app dans une identité "outil" — pas un site web, une application.
Présente dès v1 même sous forme simplifiée.

**La suggestion IA** :
Petit encart discret en haut à droite du contenu — "Suggestions IA · N parfums pour aujourd'hui".
Accessible, pas imposé. L'IA est un outil parmi d'autres, pas la feature principale.
Elle n'occupe jamais un étage entier ni le premier plan de l'écran.

---

### Impact architecture v1 — `groupBy`

L'étagère par étages implique que `useFragrances` expose une fonction de groupement :

```typescript
groupBy(criteria: 'families' | 'brand' | 'seasons' | 'concentration'): Map<string, Fragrance[]>
```

Cette fonction doit être posée en v1 même si l'étagère spatiale est v2.
En v2, le composant étagère se branche dessus sans refactor.
Le critère actif est un état global — persisté en localStorage pour mémoriser
la dernière façon dont l'utilisateur avait organisé sa collection.

---

### Mode paysage — v2 uniquement

L'expérience étagère spatiale complète (navigation keyboard-first, spots lumineux,
étages avec profondeur) est conçue pour le mode paysage sur tablette/desktop.
v0 et v1 restent mobile-first portrait.
La contrainte paysage n'entre en jeu qu'avec la navigation spatiale v2.

---

## Modèle de données

```typescript
type OlfactoryFamily =
  | "hespéridé"
  | "floral"
  | "herbacé"
  | "épicé"
  | "gourmand"
  | "boisé"
  | "résineux"
  | "musqué"
  | "alcoolisé"
  | "minéral"
  | "artificiel"
  | "indéfini";

type Season = "printemps" | "été" | "automne" | "hiver";

type Concentration =
  | "cologne"
  | "eau de toilette"
  | "eau de parfum"
  | "parfum"
  | "extrait";

interface Fragrance {
  id: string;
  name: string;
  brand: string;
  perfumer?: string;
  concentration: Concentration;

  isSample: boolean;
  volumeMl: number; // contenance flacon neuf
  remainingMl: number; // quantité restante, saisie manuelle en v0

  purchaseDate?: string;
  purchasePrice?: number;
  lastUsed?: string;

  families: OlfactoryFamily[];
  seasons: Season[];
  tags: string[]; // labels personnels libres, ex: "soirée fin d'études", "été 2025"

  rating?: 1 | 2 | 3 | 4 | 5;
  comment?: string;

  createdAt: string;
}
```

**Règle dirty state** : un parfum est considéré "complet" si les champs suivants sont tous renseignés :
`name`, `brand`, `families`, `concentration`, `volumeMl`.
Les champs `tags`, `seasons`, `rating`, `comment` et tous les champs optionnels ne bloquent jamais la complétion.

---

## Roadmap

| Version | Périmètre                                                                                                       | Horizon     |
| ------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| **v0**  | CRUD basique — ajouter / voir / supprimer un parfum (nom, marque, notes libres)                                 | Mai 2026 ✅ |
| **v1**  | Navigation (router), logique de filtres et croisements, dirty state, tags, drawer aperçu, UI filaire structurée | Juin 2026   |
| **v2**  | Supabase, auth utilisateur, étagère spatiale (paysage), moteur de suggestion, partage collection                | Juillet+    |

---

## Règles du projet

- **Une feature propre vaut mieux que trois bâclées** — ne pas rusher
- **Chaque feature = une issue GitHub + une branche + une PR + un merge**
- **Le backlog est sacré** : une idée hors scope = elle va dans le backlog, elle n'entre pas dans la version en cours
- **Structure d'abord, style ensuite** : logique métier complète avant la passe UI/shadcn

---

## Issues v0 — terminées ✅

#1 `setup: initialiser le projet React + TS + Tailwind` — mergée
#2 `feat: définir les types Fragrance` — mergée
#3 `feat: formulaire d'ajout d'un parfum` — mergée
#4 `feat: afficher la liste des parfums` — mergée
#5 `feat: supprimer un parfum de la collection` — mergée
#6 `feat: persister la collection dans localStorage` — mergée

---

## Issues v1

> À créer sur GitHub. Ordre = ordre de dépendance logique.

---

### Issue #7 — Setup React Router

**Titre** : `setup: ajouter React Router et poser la structure de navigation`

**Description** :
Installer React Router et définir les routes de l'application.
Prérequis de toutes les issues v1 impliquant une navigation ou une page dédiée.
Inclut un minimum de style structurel global (fond, typographie, max-width, espacements)
pour rendre les zones lisibles pendant la construction des features suivantes.

**Critères d'acceptance** :

- [ ] `react-router-dom` installé
- [ ] Route `/` → composant `ShelfPage` (remplace la vue actuelle)
- [ ] Route `/add` → composant `AddPage` (page d'onboarding, shell vide pour l'instant)
- [ ] Route `/fragrance/:id` → composant `FragranceDetailPage` (shell vide pour l'instant)
- [ ] Lien de navigation minimal entre les pages (header ou nav provisoire)
- [ ] Variables CSS ou classes Tailwind globales posées : fond, texte, max-width, espacements

**Branche** : `setup/router`

---

### Issue #8 — Mise à jour du modèle de données

**Titre** : `feat: ajouter le champ tags à l'interface Fragrance`

**Description** :
Étendre le modèle de données avec le champ `tags: string[]` avant de construire
les features qui en dépendent (vue détaillée, filtres, dirty state).
Un parfum sans tags n'est pas incomplet — le champ est toujours optionnel.

**Critères d'acceptance** :

- [ ] Champ `tags: string[]` ajouté à l'interface `Fragrance` dans `/types/fragrance.ts`
- [ ] Valeur par défaut `tags: []` dans le formulaire d'ajout existant
- [ ] `fragranceService` compatible (pas de breaking change)

**Branche** : `feat/fragrance-tags`

---

### Issue #9 — Dirty state

**Titre** : `feat: définir et détecter un parfum incomplet (dirty state)`

**Description** :
Un parfum peut être ajouté rapidement avec seulement nom et marque.
Il est alors "incomplet" jusqu'à ce que tous ses champs requis soient renseignés.
Cette logique est le socle du badge de notification et de l'incitation à compléter.

**Champs requis pour être complet** : `name`, `brand`, `families`, `concentration`, `volumeMl`.

**Critères d'acceptance** :

- [ ] Fonction `isComplete(fragrance: Fragrance): boolean` créée dans `/utils/fragrance.ts`
- [ ] Fonction testable et exportée
- [ ] `useFragrances` expose `incompleteCount: number` (nombre de parfums dirty)

**Branche** : `feat/dirty-state`

---

### Issue #10 — Page onboarding (saisie initiale de la collection)

**Titre** : `feat: page d'ajout complet — saisie initiale de la collection`

**Description** :
Page dédiée `/add` pour saisir sa collection au démarrage de l'app.
Formulaire complet avec tous les champs de l'interface `Fragrance`.
Cas d'usage : l'utilisateur découvre l'app et rentre ses parfums existants.

**Critères d'acceptance** :

- [ ] Formulaire avec tous les champs : nom, marque, concentration, volumeMl, families (multi-select), seasons (multi-select), tags (saisie libre), rating, comment
- [ ] Validation : nom obligatoire (les autres champs requis pour `isComplete` sont fortement encouragés mais non bloquants)
- [ ] Soumission → ajout dans la collection → redirection vers `/`
- [ ] Formulaire accessible via le router (route `/add`)

**Branche** : `feat/add-page`

---

### Issue #11 — Bouton ajout rapide

**Titre** : `feat: bouton ajout rapide — mini-formulaire depuis l'étagère`

**Description** :
Cas d'usage : l'utilisateur reçoit un nouveau parfum et veut l'ajouter en 10 secondes.
Un bouton accessible depuis la vue principale ouvre un mini-formulaire.
Le parfum créé est dirty par définition — l'app l'indique et incite à compléter.

**Critères d'acceptance** :

- [ ] Bouton "+" visible depuis la vue principale (header ou zone entre nav et liste)
- [ ] Mini-formulaire : nom + marque + families uniquement
- [ ] Soumission → parfum ajouté avec `isComplete = false` → confirmation visuelle
- [ ] Lien vers la vue détaillée pour compléter la fiche immédiatement (optionnel)

**Branche** : `feat/quick-add`

---

### Issue #12 — Badge de notification

**Titre** : `feat: badge "parfums à compléter" dans le header`

**Description** :
Indicateur visible du nombre de parfums incomplets dans la collection.
Incite l'utilisateur à compléter ses fiches sans le forcer.

**Critères d'acceptance** :

- [ ] Badge dans le header affichant `incompleteCount` (masqué si 0)
- [ ] Click sur le badge → liste filtrée des parfums incomplets
- [ ] Liste indique visuellement quels champs manquent sur chaque parfum

**Branche** : `feat/incomplete-badge`

---

### Issue #13 — Vue détaillée d'un parfum

**Titre** : `feat: page vue détaillée d'un parfum`

**Description** :
Page dédiée `/fragrance/:id` affichant tous les champs d'un parfum.
Permet aussi de compléter ou modifier la fiche.

**Critères d'acceptance** :

- [ ] Tous les champs affichés (y compris tags, families, seasons, rating, comment)
- [ ] Formulaire d'édition inline ou bouton "modifier"
- [ ] Indicateur visuel si le parfum est incomplet + rappel des champs manquants
- [ ] Bouton retour vers la vue principale

**Branche** : `feat/detail-page`

---

### Issue #14 — Drawer aperçu rapide

**Titre** : `feat: drawer aperçu rapide au click sur une carte`

**Description** :
Click sur une carte dans l'étagère → panneau qui monte depuis le bas.
Affiche les infos essentielles sans quitter la vue principale.
Mobile-first : le drawer remplace la modale (inadaptée au mobile).

**Critères d'acceptance** :

- [ ] Click sur une `FragranceCard` → drawer s'ouvre depuis le bas
- [ ] Contenu : nom, marque, families, concentration, rating, tags
- [ ] Bouton "Voir la fiche complète" → navigation vers `/fragrance/:id`
- [ ] Fermeture : bouton fermer, click en dehors, touche Échap

**Branche** : `feat/quick-drawer`

---

### Issue #15 — Logique de filtres mono-critère

**Titre** : `feat: filtres par critère unique`

**Description** :
Permettre de filtrer la collection par un critère à la fois.
Socle sur lequel le croisement de filtres (issue #16) sera construit.
La structure doit être un tableau dès le départ pour éviter un refactor.

**Critères d'acceptance** :

- [ ] `useFragrances` expose `activeFilters` et `setFilter(key, values[])`
- [ ] Filtres disponibles : `families`, `seasons`, `concentration`, `brand`, `tags`
- [ ] `filteredFragrances` recalculé automatiquement à chaque changement de filtre
- [ ] UI minimale de sélection de filtre (selects ou boutons, pas encore soignée)
- [ ] Réinitialisation des filtres possible

**Branche** : `feat/filters`

---

### Issue #16 — Croisement de filtres

**Titre** : `feat: croisement de filtres multi-critères`

**Description** :
Permettre d'activer plusieurs critères simultanément et de les croiser.
Ex : familles=[hespéridé, gourmand] + saisons=[été] + tags=[voyage].
Un parfum s'affiche s'il satisfait **tous** les critères actifs.

**Critères d'acceptance** :

- [ ] Plusieurs filtres actifs simultanément (multi-sélection par dimension)
- [ ] Logique AND entre dimensions (families ET seasons ET tags)
- [ ] Logique OR au sein d'une dimension (hespéridé OU gourmand)
- [ ] Compteur de résultats visible
- [ ] État vide géré (message si aucun résultat)

**Branche** : `feat/filters-cross`

---

### Issue #17 — Recherche textuelle

**Titre** : `feat: barre de recherche textuelle`

**Description** :
Recherche en temps réel sur le nom et la marque d'un parfum.
Compatible avec les filtres actifs (recherche + filtres se cumulent).

**Critères d'acceptance** :

- [ ] Barre de recherche dans le header
- [ ] Recherche sur `name` et `brand` (insensible à la casse)
- [ ] Résultats mis à jour en temps réel (pas de bouton "Rechercher")
- [ ] Recherche textuelle et filtres actifs se combinent (AND)
- [ ] Bouton effacer la recherche

**Branche** : `feat/search`

---

### Issue #18 — Tri de la collection

**Titre** : `feat: tri de la collection`

**Description** :
Permettre de trier les parfums affichés selon différents critères.
Le tri s'applique sur le résultat filtré.

**Critères d'acceptance** :

- [ ] Tris disponibles : alphabétique A→Z, alphabétique Z→A, date d'ajout (récent→ancien), note (si renseignée), aléatoire
- [ ] Tri actif persisté pendant la session
- [ ] Compatible avec les filtres et la recherche textuelle

**Branche** : `feat/sort`

---

### Issue #19 — Passe UI globale (shadcn)

**Titre** : `setup: intégrer shadcn/ui et soigner l'UI de l'application`

**Description** :
Une fois toutes les logiques métier en place, refonte visuelle de l'application.
Installation de shadcn/ui et remplacement des composants provisoires.
Cette issue intervient en dernier pour ne pas contraindre le layout par le style.

**Critères d'acceptance** :

- [ ] shadcn/ui installé et configuré
- [ ] Composants remplacés : Button, Card, Drawer, Badge, Input, Select
- [ ] Cohérence visuelle globale (espacements, typographie, couleurs)
- [ ] Responsive vérifié sur mobile et desktop

**Branche** : `setup/shadcn-ui`

---

## Backlog — idées pour v2+

> Ces idées sont bonnes. Elles n'entrent pas dans v1.

| Idée                                                                                                                         | Version cible |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Persistance cloud (Supabase)                                                                                                 | v2            |
| Auth utilisateur                                                                                                             | v2            |
| Étagère spatiale — navigation par étages (mode paysage)                                                                      | v2            |
| **Virtualisation de l'étagère (TanStack Virtual)**                                                                           | v2            |
| Menu latéral droit — roue de sélection des critères                                                                          | v2            |
| Moteur de recommandation par humeur / famille olfactive                                                                      | v2            |
| Intégration API météo → suggestion de parfum                                                                                 | v2            |
| Intégration API base de données parfums (Fragrantica, Basenotes) — inférence automatique famille/concentration depuis le nom | v2            |
| Partager sa collection (lien public)                                                                                         | v2            |
| Upload photo du flacon                                                                                                       | v2            |
| Estimation consommation automatique (0,5ml/utilisation × fréquence)                                                          | v2            |
| Import/export CSV                                                                                                            | v2            |

---

## Note technique — Virtualisation de l'étagère

> Prérequis de la fluidité en v2. À lire avant de coder l'étagère spatiale.

### Le problème

Un utilisateur avec 500 parfums répartis sur 12 familles olfactives ne doit pas
avoir 500 SVG dans le DOM. Le rendu de masse dégrade les performances et casse
l'effet vitrine — les animations deviennent saccadées.

### La solution : fenêtre de vue virtuelle

Principe identique à la virtualisation dans les jeux en monde ouvert :
seul ce qui est visible est rendu. Le reste existe dans les données, pas dans le DOM.

```
Collection : 500 flacons, 12 étages
Viewport   : 3 étages visibles × ~8 flacons = ~24 flacons
Tampon     : +15% au-dessus et en dessous
DOM réel   : ~30 SVG à tout moment, quelle que soit la taille de la collection
```

La navigation entre étages est une animation CSS (`transform: translateY()`)
sur le conteneur — pas un scroll natif, pas un re-render de 500 composants.
L'effet ascenseur est fluide parce que seuls ~30 nœuds bougent.

### Librairie : TanStack Virtual

- Gère listes et grilles 2D, items de taille variable
- N'opinione pas sur le rendu — on garde le contrôle total du SVG et du style
- Calcule quels items sont dans le viewport + tampon
- Fournit indices et positions — on fait le rendu

### Prérequis v1 déjà anticipé

`groupBy(criteria)` dans `useFragrances` retourne `Map<string, Fragrance[]>`.
TanStack Virtual a besoin de connaître la structure complète (nombre d'étages,
nombre d'items par étage) pour calculer les dimensions totales **sans toucher au DOM**.
Si `groupBy` est bien posé en v1, la virtualisation v2 se branche dessus sans refactor.

### Ce que ça change en v2

| Sans virtualisation                      | Avec virtualisation                            |
| ---------------------------------------- | ---------------------------------------------- |
| 500 SVG dans le DOM                      | ~30 SVG dans le DOM                            |
| Animations lentes sur grande collection  | Animations fluides quelle que soit la taille   |
| Re-render global au changement de filtre | Seule la fenêtre visible est recalculée        |
| Scroll natif difficile à contrôler       | Navigation clavier/ascenseur précise et animée |

---

_Créé le 2026-04-30 — Mis à jour le 2026-05-03 (v1 définie, Supabase décalé en v2, tags ajoutés au modèle, vision design documentée)_
