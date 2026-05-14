# DEVLOG.md — Me My Shelf and AI

> Journal de bord du projet. Une entrée par session de travail significative.
> Ce fichier trace les décisions, les bugs rencontrés, les apprentissages, et les intentions.
> Pas un commit log — une mémoire humaine du projet.

---

## Format d'une entrée

```markdown
## Session YYYY-MM-DD

### Ce qui était prévu

- [ce qu'on voulait faire]

### Ce qui a été fait

- [ce qui a vraiment été accompli]

### Décisions prises

- [choix techniques ou produit, avec le raisonnement]

### Bugs / blocages rencontrés

- [description + cause + solution]

### Apprentissages

- [ce que j'ai compris que je ne savais pas avant]

### Prochaine session

- [intention concrète pour la prochaine fois]
```

---

## Session 2026-04-30 — Lancement du projet

### Ce qui était prévu

- Définir la structure du projet
- Poser les fichiers de suivi (PRODUCT.md, DEVLOG.md, WORKFLOW.md)
- Réfléchir à l'organisation avant de coder

### Ce qui a été fait

- Vision produit définie : application de gestion de collection de parfums
- Roadmap v0 / v1 / v2 posée
- Stack décidée : React + TS + Tailwind + Vite (localStorage pour v0, Supabase pour v1)
- 6 issues v0 rédigées et prêtes à créer sur GitHub
- Fichiers PRODUCT.md, DEVLOG.md, WORKFLOW.md créés

### Décisions prises

**localStorage pour v0, pas Supabase.**
Raison : garder le scope serré. Supabase implique une config réseau, une authentification,
des variables d'environnement. Pour v0 on veut juste que le CRUD marche. Supabase c'est v1.

**Pas de router pour v0.**
Raison : une seule page suffit pour le CRUD basique. Le routing complexifie sans apporter
de valeur à ce stade. À réévaluer pour v1 si l'app grandit.

**Scope v0 : nom, marque, notes libres. Rien d'autre.**
Raison : résistance à l'envie d'ajouter des champs (notes olfactives, famille, photo...).
Ces idées sont dans le backlog. Elles n'entrent pas dans v0.

**Modèle de données étendu avant de coder.**
Le type `Fragrance` initial (nom, marque, notes libres) était trop pauvre pour
supporter le vrai produit — un assistant de collection avec recommandation.
On a défini le modèle complet dès v0 pour éviter un refactor coûteux plus tard.
Les familles olfactives sont typées (pas du texte libre) car elles seront
la base du moteur de recommandation en v1.

### Apprentissages

- La structure `PRODUCT.md / DEVLOG.md / WORKFLOW.md` est le pendant code
  de `Objectifs.md / ProgressionCoach.md / ObjectifsSemaine.md` — même logique,
  même bénéfice : externaliser la friction, garder la tête libre pour coder.
- Les issues GitHub ne sont pas "de la bureaucratie" — elles sont la trace visible
  du raisonnement produit pour les recruteurs qui liront le repo.

### Prochaine session

- Créer le repo GitHub `fragrances-companion`
- Initialiser le projet avec Vite + React + TS
- Installer Tailwind CSS v4
- Créer les 6 issues sur GitHub
- Créer la branche `dev`
- Premier commit : setup de base

---

## Session 2026-05-02 — Setup projet (Issue #1)

### Ce qui était prévu

- Créer le repo GitHub et l'initialiser
- Scaffolder Vite + React + TypeScript
- Installer et configurer Tailwind CSS v4
- Poser la structure de dossiers
- Écrire le README
- Créer les branches `dev` et `setup/init`, PR et merge

### Ce qui a été fait

- Repo GitHub créé (`TomSif/Me_My-Shelf_and_AI`), issues v0 créées en amont
- `git init` en local, remote rattaché, premier commit docs sur `main`
- Branche `dev` créée et poussée
- Branche `setup/init` créée depuis `dev`
- Vite scaffoldé (React + TypeScript), `npm install` effectué
- Tailwind CSS v4 installé (`tailwindcss` + `@tailwindcss/vite`)
- Structure de dossiers posée : `components/ui`, `components/fragrance`, `hooks`, `types`, `utils`, `services`
- Boilerplate Vite nettoyé (App.css supprimé, App.tsx réduit à un shell minimal)
- README rédigé (description, stack, roadmap, architecture)
- 3 commits atomiques sur `setup/init`, PR mergée dans `main`

### Décisions prises

**Nom du repo : `Me_My-Shelf_and_AI` (pas `fragrances-companion`).**
Le nom de code initial était `fragrances-companion`. Décision finale : garder le vrai nom du projet,
plus identitaire et cohérent avec la vision "ton outil, ton IA".

**Tailwind CSS v4 — pas de `tailwind.config.js`.**
En v4, la configuration se fait entièrement dans le CSS (directives `@theme`, `@layer`, etc.).
L'unique point d'entrée est `@import "tailwindcss"` dans `index.css`.
Le plugin `@tailwindcss/vite` remplace l'ancien `postcss`.

**`.claude/` exclu du repo via `.gitignore`.**
Ce dossier contient les fichiers de mémoire et de configuration de Claude Code.
Utiles en local, pas pertinents dans l'historique git.

**3 commits atomiques pour le setup.**
Conformément au WORKFLOW : scaffolding Vite / config Tailwind / structure dossiers
sont trois intentions distinctes. Ça se lit dans `git log`.

### Bugs / blocages rencontrés

**`npm create vite` annulé sur dossier non vide.**
Vite affiche un menu interactif quand le dossier cible contient déjà des fichiers.
Impossible à bypasser avec `echo y |` — le prompt utilise une sélection, pas un input texte.
Solution : scaffolder dans un sous-dossier temporaire `_vite_tmp/`, puis déplacer les fichiers.

**PR mergée dans `main` au lieu de `dev`.**
La PR #7 a été mergée directement dans `main`. Corrigé en mergant `main` dans `dev`
pour remettre les deux branches en phase. À retenir : toujours vérifier la branche cible
dans l'interface GitHub avant de merger (base doit être `dev`, pas `main`).

### Apprentissages

- Tailwind v4 a une approche radicalement différente de v3 : pas de fichier de config JS,
  tout passe par le CSS. Plus simple à démarrer, mais la doc v3 ne s'applique plus.
- `npm create vite` est interactif par design — prévoir de scaffolder dans un dossier propre
  si le dossier cible contient déjà des fichiers.
- Dans GitHub, la branche **base** d'une PR = la branche de destination. Toujours vérifier
  qu'elle est bien `dev` avant de merger.

### Prochaine session

- Issue #2 : définir les types TypeScript dans `src/types/fragrance.ts`
  (`OlfactoryFamily`, `Season`, `Concentration`, interface `Fragrance`)
- Branche : `feat/fragrance-type`

---

## Session 2026-05-03 — Issues #4 et #5

### Ce qui était prévu

- Issue #4 : composant `FragranceCard` + liste des parfums
- Issue #5 : suppression d'un parfum

### Ce qui a été fait

**Issue #4 — Afficher la liste (`feat/list-fragrances`, mergée dans `dev`)**
- Composant `FragranceCard.tsx` : affiche nom, marque, notes libres (si présentes)
- Composant `FragranceList.tsx` : gère l'état vide + mappe sur `FragranceCard`
- `App.tsx` mis à jour : `<FragranceList>` remplace le compteur, mise en page centrée

**Issue #5 — Suppression (`feat/delete-fragrance`, en cours)**
- Prop `onDelete: (id: string) => void` ajoutée sur `FragranceCard` et `FragranceList`
- `handleDelete` dans `App.tsx` : filtre le tableau par id
- Confirmation via `window.confirm()` avant suppression

### Décisions prises

**`window.confirm()` pour la confirmation de suppression en v0.**
Raison : protège contre la fausse manip sans complexifier le code. Une modale custom
(shadcn Dialog) viendra en v1 quand l'UI sera soignée.

**`onDelete` traverse les deux composants (FragranceList → FragranceCard).**
La logique de suppression appartient à `App.tsx` qui détient le state. Les composants
ne font que remonter l'id — ils ne mutent rien eux-mêmes.

### Prochaine session

- Merger la PR `feat/delete-fragrance → dev`
- Issue #6 : persistance localStorage (`feat/local-storage`)

---

## Session 2026-05-03 (suite) — Issue #6

### Ce qui était prévu

- Persistance de la collection dans localStorage

### Ce qui a été fait

- `src/services/fragranceService.ts` créé : `getAll()` et `save()`, seul endroit du code qui touche localStorage
- `src/hooks/useFragrances.ts` créé : state, chargement initial, sauvegarde automatique, `add` et `remove`
- `App.tsx` simplifié : toute la logique métier déléguée au hook, ne garde que le JSX

### Décisions prises

**Couche service dès v0.**
`fragranceService.ts` abstrait la source de données. En v1, on remplace son implémentation
par Supabase sans toucher aux composants ni au hook. C'est le seul fichier qui change.

**Initialisation lazy du state.**
`useState(() => fragranceService.getAll())` charge localStorage de façon synchrone,
avant le premier render. L'alternative avec deux `useEffect` (un pour charger, un pour sauvegarder)
crée une race condition : le `useEffect` de sauvegarde s'exécute avec `[]` et écrase localStorage.
L'initialiseur lazy supprime ce piège.

**`useFragrances` encapsule toute la logique métier.**
`App.tsx` ne contient plus que du JSX. Si demain on ajoute un tri, une recherche ou
un filtre, ça entre dans le hook — pas dans le composant.

### Apprentissages

- Un initialiseur lazy `useState(() => fn())` est appelé une seule fois, de façon synchrone,
  avant le premier render. À préférer à `useEffect` pour initialiser depuis une source synchrone
  (localStorage, sessionStorage, variables d'environnement).
- La couche service permet le swap v0→v1 sans refactor : changer une implémentation,
  pas une interface.

### Prochaine session

- Merger `feat/local-storage → dev` puis `dev → main` : v0 complète
- Réfléchir au scope v1 : UI soignée (shadcn), filtres, Supabase

---

## Session 2026-05-12 — Issues #7, #8, #7b + nettoyage

### Ce qui était prévu

- Démarrer v1 en attaquant l'issue #7 (React Router)

### Ce qui a été fait

**Avant de coder — mise en ordre**
- PRODUCT.md mis à jour avec les issues v1 complètes (#7 à #19), commité sur `dev`
- Branches locales mortes nettoyées (`feat/*`, `setup/init`) — toutes les branches v0 supprimées
- Branches GitHub nettoyées via l'interface

**Issue #7 — Setup React Router (`setup/router`, mergée)**
- `react-router-dom` installé
- `src/pages/` créé — `ShelfPage` (reprend `App.tsx`), `AddPage` (shell), `FragranceDetailPage` (shell avec `useParams`)
- `App.tsx` réduit à son rôle de point d'entrée du router
- `index.css` enrichi : variables CSS globales (`--color-bg`, `--max-width-app`, etc.) + classes de layout (`.app-layout`, `.app-header`, `.app-main`)
- `CLAUDE.md` mis à jour : structure `pages/`, stack v1 en cours
- `WORKFLOW.md` enrichi : recette nettoyage des branches mortes, explication PR

**Issue #8 — Champ tags (`feat/fragrance-tags`, mergée)**
- `tags: string[]` ajouté à l'interface `Fragrance` dans `types/fragrance.ts`
- `tags: []` initialisé dans `FragranceForm`
- `CLAUDE.md` et `PRODUCT.md` synchronisés

**Issue #7b — Setup Zustand (`setup/zustand`, PR à créer)**
- Scope réduit : `useSettingsStore`, `groupBy`, `getLiquidColor`, `getBottleSize` déplacés en backlog v2
- `zustand` installé
- `useFragrancesStore` créé dans `src/stores/fragrancesStore.ts` — expose `fragrances`, `add`, `remove`, persisté via middleware `persist`
- `useFragrances` supprimé
- `ShelfPage` migré vers le store
- `CLAUDE.md` mis à jour : `src/stores/` ajouté à la structure, principe "store comme couche de données"

### Décisions prises

**`src/pages/` et `src/stores/` ajoutés à la structure.**
Deux dossiers non prévus dans le CLAUDE.md initial, mais inévitables dès lors qu'on a React Router et Zustand. Structure mise à jour en conséquence.

**Zustand remplace `useFragrances`, pas `fragranceService`.**
Le hook `useFragrances` est supprimé — Zustand le remplace comme couche de données partagée entre les pages. `fragranceService.ts` reste : il représente le contrat d'interface bas niveau qui sera réimplémenté en Supabase en v2.

**Scope de #7b réduit — groupBy et bottle utils en backlog v2.**
`groupBy`, `useSettingsStore`, `getLiquidColor`, `getBottleSize` sont prérequis de l'étagère spatiale, pas des filtres ni du dirty state. Les coder maintenant = anticiper une feature sans composant consommateur. Principe : une idée hors scope va dans le backlog.

**Format localStorage incompatible entre v0 et v1.**
Zustand persist stocke `{"state":{"fragrances":[...]},"version":0}` — l'ancien format était un tableau brut. Les données de test v0 sont perdues. Acceptable en dev ; en v2 une migration Supabase remplacera le tout.

### Bugs / blocages rencontrés

**Commit PRODUCT.md fait sur `feat/fragrance-tags` au lieu de `dev`.**
La modification du scope de #7b a été commitée sur la branche feature en cours. Résultat : git considérait la branche comme "non mergée" après la PR → `git branch -D` obligatoire au lieu de `-d`.
Règle retenue : les commits de doc non liés à une feature vont directement sur `dev`.

**Erreur SSL sur `git fetch --prune`.**
`fatal: unable to get local issuer certificate` — résolu avec `git config --global http.sslBackend schannel` (Git utilise le gestionnaire de certificats Windows).

### Apprentissages

- `git branch -d` vs `-D` : minuscule vérifie que la branche est mergée, majuscule force la suppression. Si une branche a des commits non reconnus par git (squash merge, commits orphelins), `-D` est nécessaire même si le code est bien dans `dev`.
- `git fetch --prune` : met à jour la carte locale des branches remote et supprime les entrées qui n'existent plus. Purement cosmétique — ne touche pas le code.
- Zustand `partialize` : permet de ne persister que les données (pas les fonctions) dans localStorage. Sans `partialize`, Zustand tente de sérialiser tout le state, y compris les fonctions — ce qui ne fonctionne pas.

### Prochaine session

- Merger `setup/zustand → dev` via PR
- Issue #9 : dirty state — fonction `isComplete()` + `incompleteCount` dans le store

---

## Session 2026-05-13 — Issues #20 et #9

### Ce qui était prévu

- Issue #20 : vue collection (mur de flacons SVG)
- Issue #9 : dirty state

### Ce qui a été fait

**Modèle de données — `GenreOlfactif` (commit direct sur `dev`)**
- Type `GenreOlfactif = -3 | -2 | -1 | 0 | 1 | 2 | 3` ajouté dans `types/fragrance.ts`
- Champ optionnel `genre?: GenreOlfactif` ajouté à l'interface `Fragrance`
- `CLAUDE.md` synchronisé avec le modèle mis à jour

**Issue #20 — Vue Collection (`feat/collection-view`, mergée)**
- Design system complet intégré dans `index.css` : tokens pour couleurs, ombres, glassmorphism, motion, familles olfactives (12 teintes désaturées), UI states, iconographie
- `getLiquidColor()` dans `utils/fragrance.ts` : mappe les familles olfactives vers les variables CSS
- Composants layout extraits en composants indépendants : `AppLayout`, `AppHeader`, `SideNav`, `GestureBar`
- `FragranceBottle` : SVG 40×60px généré à la volée, coloré par famille (cap, col, épaules, corps, reflet)
- `BottleWall` : grille CSS `auto-fill` de 40px, tooltip au hover, navigation au double-clic
- `CollectionPage` branchée sur `/`, état vide géré proprement
- `ShelfPage` déplacée sur `/shelf`

**Issue #9 — Dirty state (`feat/dirty-state`, en cours)**
- `isComplete(fragrance)` dans `utils/fragrance.ts` : vérifie name, brand, families, concentration, volumeMl
- `incompleteCount` exposé dans `useFragrancesStore` comme getter calculé — jamais persisté en localStorage

### Décisions prises

**Composants layout extraits dès le départ, pas inline dans les pages.**
Première version de `CollectionPage` écrivait le header et la nav directement dans la page.
Thomas a corrigé : "pense DRY". Refactorisé en `AppLayout` wrappant `AppHeader + SideNav + GestureBar`.
Règle retenue : les éléments chrome partagés (header, nav) sont des composants indépendants dès leur première occurrence.

**`GenreOlfactif` ajouté directement sur `dev` avant la session.**
Décision de Thomas : échelle -3 → +3 (très féminin ↔ très masculin, 0 = unisexe). Type union de littéraux numériques plutôt qu'un `number` pour contraindre les valeurs valides. Champ optionnel car non requis pour `isComplete`.

**`incompleteCount` est un getter, pas une propriété stockée.**
Zustand permet des getters JavaScript natifs dans le state object. `get incompleteCount()` appelle `get().fragrances.filter(...)` à chaque lecture — calculé en temps réel, rien à synchroniser, jamais persisté.

**CSS Tailwind-first — pas de fichier CSS par composant.**
Tous les styles sont en Tailwind utilities ou en `style={{ var(--token) }}` inline. `index.css` ne contient que les tokens `:root` et le `body`. Pas de fichiers `.module.css` — Tailwind v4 les rend superflus pour ce projet.

### Bugs / blocages rencontrés

**`Edit` tool échoue sur PRODUCT.md** (encodage CRLF).
La substitution `useFragrances` → `useFragrancesStore` a nécessité un appel PowerShell `-replace` plutôt que l'outil Edit.

### Apprentissages

- SVG inline en React : les attributs snake_case CSS deviennent camelCase (`stroke-width` → `strokeWidth`), mais les attributs SVG natifs (`fill`, `stroke`, `rx`) restent en lowercase.
- Zustand `get incompleteCount()` : un getter JS standard fonctionne dans le state object — Zustand ne le sérialise pas, il recalcule à chaque accès.
- `gridTemplateColumns: "repeat(auto-fill, 40px)"` : grille CSS qui adapte automatiquement le nombre de colonnes à la largeur disponible, sans media queries.

### Prochaine session

- Merger `feat/dirty-state → dev` via PR
- Issue #10 : page d'ajout complet — à concevoir avec Thomas (UI/UX à définir avant de coder)

---

_Créé le 2026-04-30_


## Session 2026-05-14 — Issues #9b, #10/#13, #11, #12

### Ce qui était prévu

- Issue #9b : étendre le modèle (pyramide olfactive + complétion par section)
- Issue #10 : FragrancePage (création + vue détaillée)
- Issues suivantes selon avancement

### Ce qui a été fait

**Issue #9b — Extension du modèle (`feat/fragrance-model-v2`, mergée)**
- `OlfactoryPyramid { top, heart, base: string[] }` ajouté aux types
- `pyramid?: OlfactoryPyramid` ajouté à `Fragrance`
- `interface SectionCompletion { identity, physical, olfactive, memory: boolean }` créé dans `utils/fragrance.ts`
- `getSectionCompletion(fragrance)` : identity = name+brand, physical = concentration+volumeMl, olfactive = families.length > 0, memory = rating !== undefined
- `isComplete()` inchangé — les deux fonctions ont des rôles distincts

**Issues #10 + #13 fusionnées — FragrancePage (`feat/add-page`, mergée)**
- Décision : AddPage et FragranceDetailPage affichent exactement les mêmes informations → un seul composant, deux modes UX
- `/add` → `<FragrancePage mode="create">`, `/fragrance/:id` → `<FragrancePage mode="view">`
- Layout : grid 3 colonnes égales, flacon hero centré, 4 sections + pyramide
- `FragranceBottle` étendu : 5 états visuels (`empty / identity / physical / olfactive / complete`) via mapping données → attributs SVG (pas classes CSS)
- 6 composants de saisie créés : `ConcentrationPicker`, `FamilyChips`, `GenreSlider`, `TagsInput`, `PyramidInput`, `RatingPicker`
- Mode `create` : focus guidé section par section via `useEffect` + `scrollIntoView`
- Mode `view` : navigation libre, champs éditables
- `store.update(id, data)` ajouté à `fragrancesStore`
- `store.add()` modifié pour retourner l'`id` créé
- Indicateur de complétion % + check par section

**Issue #11 — Bouton ajout rapide (`feat/quick-add`, mergée)**
- Bouton `+` (cercle amber) dans `AppHeader`, visible depuis `CollectionPage`
- `QuickAddModal` : nom + marque + familles, save & close uniquement
- Décision (Thomas) : ajout rapide et page détail sont deux chemins séparés — pas de redirection post-save

**Issue #12 — Badge incompleteCount (`feat/incomplete-badge`, mergée)**
- Badge amber dans `AppHeader` (masqué si 0), cliquable
- `IncompletePanel` : panneau flottant listant les parfums incomplets, chips par section manquante (Identité / Physique / Olfactif / Mémoire), lien direct vers `/fragrance/:id`
- Wiring : `AppLayout` → `AppHeader` → `CollectionPage`

**PRODUCT.md — Philosophie UI ajoutée (Thomas)**
- Section "Objets Olfactifs Interactifs" : 3 niveaux d'engagement Glance / Peek / Explore
- Issue #14 (drawer) recentrée : Peek uniquement depuis Vue Collection, scope strict
- Click → drawer, double-click → `/fragrance/:id`

### Décisions prises

**`memory` = `rating !== undefined`.**
La section Mémoire n'a pas de champ obligatoire. La note est le signal le plus précieux — elle indique que l'utilisateur a testé le parfum. C'est elle qui déclenche l'état "testé".

**États visuels du flacon = mapping données → attributs SVG, pas classes CSS.**
Thomas a posé la question : les états ne seront-ils pas des attributs SVG en v2 ? Oui. Décision : `BOTTLE_VISUAL: Record<BottleState, { bodyOpacity, liquidOpacity, glowOpacity }>` — les états déclenchent des fonctions de rendu, pas des classes. Extensible vers des animations SVG sans changer l'interface du composant.

**Un seul composant pour create et view.**
Thomas : "si c'est exactement les mêmes éléments, pourquoi les séparer ?" La différence est dans le comportement UX (focus guidé vs libre), pas dans le layout. `FragrancePage` est la source de vérité pour les deux routes.

**`incompleteCount` = valeur d'état recalculée à chaque mutation.**
Le getter JavaScript ne survit pas au spread Zustand — voir bug ci-dessous. Remplacé par une valeur d'état mise à jour dans `add`, `update`, `remove`, et restaurée via `onRehydrateStorage` au démarrage.

### Bugs / blocages rencontrés

**`purchasePrice: string` non assignable à `number` dans `getSectionCompletion`.**
`FormState` utilise `purchasePrice: string` pour la compatibilité `<input>`. Converti avant chaque appel : `purchasePrice: form.purchasePrice ? parseFloat(form.purchasePrice) : undefined`.

**`completion.memory` absent des dépendances `useEffect`.**
React avertit d'une dépendance manquante dans le tableau du `useEffect` de focus guidé. Ajouté.

**Grid layout incorrect (colonnes inégales).**
Premier rendu : `gridTemplateColumns: "1fr auto 1fr"` — la colonne centrale se redimensionnait librement. Corrigé en `"1fr 1fr 1fr"` avec `gridColumn`/`gridRow` explicites sur chaque section.

**PR mergée dans `main` au lieu de `dev` (deuxième occurrence).**
Corrigée par `git checkout dev && git merge origin/main` (fast-forward propre). Les issues GitHub n'ont pas été auto-fermées car le merge n'a pas touché la branche par défaut — fermées manuellement.

**`incompleteCount` toujours à 0 — getter JavaScript incompatible avec Zustand.**
`get incompleteCount() { return get().fragrances.filter(...) }` : quand Zustand spread l'état, le getter JS est évalué une fois et figé comme valeur primitive. Il ne se met plus jamais à jour.
Solution : valeur plain recalculée dans chaque mutation via `countIncomplete(fragrances)` + `onRehydrateStorage`.
Note : l'entrée du 2026-05-13 indiquait que le getter fonctionnait — c'était incorrect. Corrigé aujourd'hui.

### Apprentissages

- **Spread JavaScript évalue les getters.** `{ ...obj }` produit des valeurs, pas des getters. Zustand utilise le spread pour mettre à jour l'état → les getters JS ne fonctionnent pas comme état dérivé réactif.
- **`onRehydrateStorage` de Zustand persist.** Callback appelé après le chargement depuis localStorage. Utile pour recalculer des valeurs dérivées non persistées.
- **PR dans GitHub — base = destination.** Encore une fois : toujours vérifier que "base" est `dev` avant de merger. Deuxième occurrence de cette erreur.

### Prochaine session

- Issue #14 : drawer aperçu rapide depuis Vue Collection
  - Click → drawer, double-click → `/fragrance/:id` (modifier comportement de `BottleWall`)
  - Contenu : flacon SVG · nom · marque · famille · concentration · remainingMl · rating · tags
  - Navigation left/right entre parfums adjacents
  - Fermeture : click dehors · Échap · swipe bas

---
