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


## Session 2026-05-16 — Issue #14 GestureBar Dynamic Island

### Ce qui était prévu

- Issue #14 : aperçu rapide depuis la Vue Collection

### Ce qui a été fait

**Issue #14 — GestureBar Dynamic Island (`feat/quick-drawer`, mergée)**

- `RatingPicker` : `onChange` rendu optionnel → mode lecture seule (spans) vs mode interactif (buttons)
- `GestureBar` : composant unique à deux états — minimal (hints + flèches) / élargi (peek content + hints + flèches)
- `BottleWall` : click → sélectionner, double-click (via `e.detail`) → ouvrir fiche
- `AppLayout` : passage des props peek (`selectedFragrance`, `hasPrev/hasNext`, callbacks)
- `CollectionPage` : gestion de `selectedId`, calcul prev/next, câblage complet

**Peek content :**
Identité (nom · marque · concentration) à gauche · Flacon centré (`size=2`) · Volume + rating + tags à droite.
Navigation ← › au clic et au clavier (Échap, ArrowLeft, ArrowRight via `window.addEventListener`).

### Décisions prises

**Un seul composant GestureBar, deux états.**
Première itération : deux composants séparés (`GestureBar` hints + `PeekCard` flottante fixée au-dessus).
Thomas a recadré : "c'est le même composant, il se déroule vers le haut". Résultat : une seule `<footer>`, le contenu peek apparaît en haut via un bloc conditionnel séparé par une bordure. La barre hints reste toujours en bas.

**Le flacon est centré — "la star du show".**
Layout peek : texte à gauche, flacon au centre (`flex-1 justify-center`), infos à droite. Ce n'est pas une carte de métadonnées avec une vignette — c'est un objet centré avec du contexte autour.

**`e.detail >= 2` au lieu de `onDoubleClick`.**
Avoir `onClick` ET `onDoubleClick` sur le même élément crée un conflit : React peut re-rendre entre le premier click (qui sélectionne) et le `dblclick`. En utilisant un seul handler `onClick` et en lisant `e.detail` (le navigateur incrémente le compteur avant de déclencher `dblclick`), on évite tout timing à gérer. Le deuxième click d'un double-clic arrive avec `e.detail === 2`.

**Keyboard navigation dans `GestureBar` via `window.addEventListener`.**
Le listener est sur `window`, pas sur un élément focusé — il fonctionne indépendamment du focus DOM. Monté quand `selectedFragrance` est défini, démonté au cleanup. Touches : Échap (fermer), ArrowLeft (prev), ArrowRight (next).

**`RatingPicker` refactorisé pour le mode lecture.**
Plutôt que de créer un composant `Stars` dupliqué dans GestureBar, `onChange` est rendu optionnel dans `RatingPicker`. Sans `onChange` → `<span>` non interactif. Avec `onChange` → `<button>` interactif. Un seul composant, deux usages.

### Bugs / blocages rencontrés

**Architecture initiale erronée — deux composants séparés.**
Premier jet : `GestureBar` (toujours visible, hints) + `PeekCard` (fixed, flottante au-dessus). Thomas a corrigé : la GestureBar est le conteneur, le peek en sort vers le haut. Refactorisé en un seul composant.

**Double-click non fonctionnel après l'ajout du click simple.**
Avant : `BottleCell` avait seulement `onDoubleClick` → navigate. Après : `onClick` (sélectionner) + `onDoubleClick` (naviguer). React 18 peut re-rendre entre les deux events, cassant la séquence dblclick.
Solution : `e.detail >= 2` dans un unique `onClick`. Simple, natif, sans timer.

**Flèches clavier non fonctionnelles.**
Causé par la séparation en deux composants (GestureBar + PeekCard avaient chacun leur listener). Une fois fusionnés en un seul composant avec un seul `useEffect` sur `window`, résolu automatiquement.

### Apprentissages

- **`e.detail` sur les événements de souris** : compteur de clics consécutifs rapides. Sur le deuxième click d'un double-clic, `e.detail === 2` avant même que `dblclick` ne se déclenche. Préférable à `onDoubleClick` quand `onClick` est aussi présent sur l'élément.
- **`window.addEventListener` dans `useEffect`** : le listener clavier fonctionne indépendamment du focus DOM. Pattern propre pour les raccourcis globaux : monter au mount / sélection, démonter au cleanup.
- **Un composant = une responsabilité, mais aussi une responsabilité complète.** La tentation de séparer GestureBar (layout) et PeekCard (fragrance) était architecturalement séduisante, mais elle cassait la cohésion visuelle et compliquait le keyboard. L'unité du composant reflète l'unité UX.

### Prochaine session

- Issues #15-16 : filtres mono-critère puis croisés
- Issue #17 : recherche textuelle
- Issue #19 : passe UI (shadcn, vraies icônes, responsive mobile)

---

## Session 2026-05-17 — Issues #22, #23, #24a, #24b — isFavorite + Filter Atelier complet

### Ce qui était prévu

- Issue #22 : champ `isFavorite` sur le modèle + toggle ♡/♥ dans FragrancePage
- Issue #23 : refonte SideNav → Atelier rail extensible
- Issue #24a : store de filtres complet (`filteredFragrances`, `hasActiveFilters`, logique AND/OR)
- Issue #24b : Filter Atelier UI dans le rail

### Ce qui a été fait

**Issue #22 — `feat/fragrance-favorite` (mergée)**

- `isFavorite: boolean` ajouté au modèle `Fragrance` et à `NewFragrance`
- Valeur par défaut `false` dans `QuickAddModal` et `FragrancePage`
- Toggle ♡/♥ dans la Section 4 de la fiche parfum, câblé sur `update()`

**Issue #23 — `feat/atelier-rail` (mergée)**

- `SideNav` supprimé, remplacé par `Atelier` — rail latéral extensible
- Fermé : 48px (icônes condensées `»` + É/♡/S/R)
- Ouvert : 340px (header "L'Atelier", zone content, nav labels)
- Transition CSS `width` 200ms — pas de Framer Motion
- État persisté dans `localStorage` clé `atelier-open`

**Issue #24a — `feat/filter-store` (mergée)**

- Types `PyramidNotesFilter` et `ActiveFilters` ajoutés à `fragrance.ts`
- Store entièrement revu : `activeFilters`, `filteredFragrances`, `hasActiveFilters`
- Logique AND entre dimensions, OR à l'intérieur de chaque dimension
- Recherche pyramidale : includes partiel insensible à la casse (top/heart/base)
- `applyFilters()` recalculée à chaque mutation (jamais persistée)
- `onRehydrateStorage` recompute les valeurs dérivées au chargement
- `BottleWall` : fragrances non-matchantes à opacity 20% + saturate(0) — collection toujours visible
- Navigation prev/next de la GestureBar suit `displayList` (filtré si filtres actifs)

**Issue #24b — `feat/filter-ui` (mergée)**

- `FilterPanel` entièrement réécrit dans `src/components/fragrance/FilterPanel.tsx`
- Niveau 1 ouvert : FAMILLES (dot coloré par famille + chips), SAISONS (✿☀◆✦ + chips), CONCENTRATION (Cologne/EDT/EDP/Parfum/Extrait)
- Niveau 2 replié : TAGS (autocomplete + chips supprimables), SÉLECTION (3 toggles capsule : Favoris / Jamais portés / Échantillons)
- Niveau 3 replié : MARQUE, PARFUMEUR (autocomplete multi-valeurs + chips), PYRAMIDE (3 inputs Tête/Cœur/Fond)
- Titre replié avec résumé actif : `FAMILLES · boisé, floral ∧`
- Autocomplete : suggestions uniquement à la frappe (input vide → rien affiché)
- Scroll sans scrollbar visible + fade haut/bas via `mask-image`
- "Tout effacer" en bas, visible uniquement si filtres actifs
- Branché dans `Atelier.tsx` en remplacement du shell vide `#24b`

### Décisions prises

**`filteredFragrances` comme état dérivé, non persisté.**
Calculé à chaque mutation du store. Seules `fragrances` et `activeFilters` sont persistées. `onRehydrateStorage` reconstruit les valeurs dérivées après le chargement localStorage. Avantage : source de vérité unique, jamais de désynchronisation.

**BottleWall : dimming plutôt que masquage.**
Quand des filtres sont actifs, les fragrances non-matchantes restent visibles à opacity 20% + saturate(0). La collection complète reste perceptible — on ne disparaît pas, on s'efface. C'est une décision de lecture : le filtrage dans ce contexte est une loupe, pas un masque.

**Les filtres Favoris/Jamais portés/Échantillons groupés dans "SÉLECTION".**
L'issue prévoyait 3 sections séparées. Regroupées en une seule section avec 3 toggles : réduit la liste de sections dans un rail de 340px, meilleure densité d'information.

**Autocomplete vide → pas de suggestions.**
Afficher tous les tags/marques/parfumeurs au focus cassait l'UI (liste trop longue). La dropdown n'apparaît que si l'input contient du texte — filtre dès la première lettre.

### Bugs / blocages rencontrés

**`git stash` a causé une perte de données dans PRODUCT.md.**
En cours de travail sur `feat/filters`, un `git stash` a causé un switch vers `dev` avec une version antérieure de PRODUCT.md (sans les issues #22-#24b). Un commit `docs:` sur cette version incomplète a écrasé les nouvelles issues. Thomas a restauré manuellement.
→ Décision : plus de `git stash`. WIP commit (`wip: description`) à la place, toujours en chronologique.

**`pyramidNotes` ajouté en cours d'implémentation de #24a.**
Thomas a ajouté la section "recherche par note pyramidale" à l'issue #24a après le début du développement. Nécessité d'ajouter l'interface `PyramidNotesFilter`, de modifier `DEFAULT_FILTERS`, `hasActive()` et `applyFilters()` — travail découpé proprement en commits atomiques.

### Apprentissages

- **`git stash` est risqué dans un workflow multi-fichiers avec docs versionnées.** Le stash inclut les modifications non commitées — si on commite un autre état entre-temps, les conflits peuvent être silencieux sur des fichiers comme PRODUCT.md. Le commit WIP est plus sûr et plus traçable.
- **Computed state dans Zustand via `onRehydrateStorage`.** Les valeurs dérivées (`filteredFragrances`, `hasActiveFilters`, `incompleteCount`) ne peuvent pas être persistées et restituées directement — elles doivent être recalculées. `onRehydrateStorage` est le hook prévu pour ça : appelé après désérialisation, avant que les composants ne s'abonnent.
- **`mask-image` CSS pour le fade de scroll.** La propriété masque visuellement le contenu au-delà des bords sans affecter le layout ni la scrollabilité. Nécessite le préfixe `-webkit-mask-image` pour Chrome/Safari.

### Prochaine session

- Issue #18 : tri de la collection
- Issue #17 : recherche rapide
- Issue #21 : curation (statut porté, notes d'usure)

---

## Session 2026-06-02 — Issues #18, #25, #26 + modèle cuiré + base de test

### Ce qui était prévu

- Issue #18 : tri de la collection
- Issue #25 : log d'utilisation
- Issue #26 : Aujourd'hui (Mezzanine)

### Ce qui a été fait

**Issue #18 — Tri de la collection (`feat/sort`, mergée)**

- Types `SortCriterion`, `SortDirection`, `SortState` ajoutés dans `fragrance.ts`
- `applySort()` dans le store : 7 critères + `"none"` + `"random"`, valeurs `undefined` toujours en fin de liste
- `sortState` persisté en localStorage, `sortedFragrances` recalculé à chaque mutation
- Dropdown `AppHeader` : deux colonnes (critères ↔ directions), sous-menu verrouillé sur le dernier critère survolé (fix diagonal cursor), hover + focus sur les boutons de direction
- `"Aucun tri"` en tête de liste : remet l'ordre d'insertion, bouton header neutre
- `CollectionPage` consomme `sortedFragrances` pour l'affichage et la navigation prev/next

**Issue #25 — Log d'utilisation (`feat/log-usage`, mergée)**

- `wearToday(id)` / `unwearToday(id)` dans le store — actions sémantiques exportées
- `todayFragrances[]` état dérivé, recalculé à chaque mutation et à la réhydratation
- `isWornToday(f)` exporté depuis le store
- `formatLastUsed()` dans `utils/fragrance.ts` — "Porté hier", "il y a 3 jours", "il y a 2 mois"…
- GestureBar (peek) : bouton toggle "Porter/Porté aujourd'hui ✓"
- FragrancePage (mode view) : bouton toggle + label lisible au-dessus du champ date
- Décision : store de #26 (`wearToday`/`unwearToday`/`todayFragrances`) posé dans #25 pour éviter le refactor

**Issue #26 — Aujourd'hui / Mezzanine (`feat/aujourd-hui`, mergée)**

- `Mezzanine.tsx` : composant permanent entre header et contenu dans `AppLayout`
- 3 états : vide (invitation), replié (dots colorés + compteur + chevron), déplié (liste nom · marque · concentration + × pour retirer)
- Clic droit sur un flacon → menu contextuel "Porter/Porté aujourd'hui ✓" (toggle), fermeture au clic extérieur ou Échap
- Filtre local `isWornToday` dans la Mezzanine : exact à minuit sans timer

**Extension du modèle — `"cuiré"` (`OlfactoryFamily`)**

- Famille "cuiré" ajoutée au type, couleur `#a0705a` (brun cuir chaud), variable CSS `--family-cuire`
- `FamilyChips`, `FilterPanel`, `utils/fragrance.ts` mis à jour
- Discussion préalable : "oriental", "oud", "vert", "chypré" sont des accords ou mappings, pas des familles manquantes — seul "cuiré" était un vrai oubli

**Base de données de test (`public/fragrances_import.json`)**

- 10 parfums réels représentatifs de la collection de Thomas (Amouage, Bortnikoff, Caron, Chanel, Dior, Dana…)
- Familles normalisées : `"oriental"` → `"épicé"`, `"oud"` → `"boisé"`, `"vert"` → `"herbacé"`, `"chypré"` → `["boisé", "hespéridé", "herbacé"]` (spread), `"extrait de parfum"` → `"extrait"`
- Commande d'injection : `fetch('/fragrances_import.json').then(r=>r.json()).then(d=>{localStorage.setItem('fragrances',JSON.stringify(d));location.reload()})`

### Décisions prises

**Store #26 anticipé dans #25 — `wearToday`/`unwearToday`/`todayFragrances`.**
Avant de coder #25, Thomas a fait observer que "Porter aujourd'hui" et "glisser dans la Mezzanine" sont la même action. Décision : poser les actions sémantiques et l'état dérivé dans #25 pour que #26 soit uniquement de l'UI. Zéro refactor store en #26.

**`unwearToday` pour annuler l'action — bouton toggle.**
Thomas : "comment annuler si on clique par erreur ?" Solution : le bouton ne se désactive pas, il s'inverse. "Porter aujourd'hui" → `wearToday`, "Porté aujourd'hui ✓" → `unwearToday`. Même logique que le toggle Favori. Retirer depuis la Mezzanine appelle la même `unwearToday`.

**"Aucun tri" comme état par défaut (ordre d'insertion), pas "Alphabétique".**
La collection s'affichait triée alphabétiquement au démarrage sans que l'utilisateur ait rien demandé. Corrigé : `DEFAULT_SORT = { criterion: "none", direction: "asc" }`. L'ordre alphabétique est un choix explicite, pas une valeur par défaut silencieuse.

**"Chypré" = accord, pas une famille.**
Thomas : "chypré n'est pas vraiment une famille, c'est un mélange". Miss Dior (chypré) traduit en `["boisé", "hespéridé", "herbacé"]` — les vraies familles présentes dans un chypre classique. Confirmation que `families` est bien un tableau multi-valeurs pour ce cas.

**Reset minuit par filtre local, pas par timer.**
`todayFragrances.filter(isWornToday)` dans la Mezzanine est recalculé à chaque render. Exact à tout moment sans `setTimeout` complexe. Si l'app est ouverte à minuit, la liste se vide à la prochaine interaction de l'utilisateur.

### Bugs / blocages rencontrés

**`activeCriterion` non défini — crash au démarrage du dropdown.**
Renommé en `subMenuCriterion` lors du refactor pour fixer le diagonal cursor, mais une référence à `activeCriterion` avait été oubliée dans le sous-menu directions. Crash runtime immédiat. Détecté à l'exécution (TypeScript ne peut pas détecter les variables de fermeture JSX non typées dans certains contextes).

**Diagonal cursor dans le dropdown de tri.**
Symptôme : déplacer la souris vers la colonne droite (directions) réinitialisait le sous-menu sur "Alphabétique" (le tri par défaut du store). Cause : `onMouseLeave` sur chaque bouton critère remettait `hoveredCriterion` à `null`, ce qui déclenchait le fallback `activeCriterion = null ?? sortState.criterion`.
Fix : deux états séparés — `highlightedCriterion` (highlight visuel, reset au leave) et `subMenuCriterion` (sous-menu affiché, jamais reset au leave d'un bouton individuel).

### Discussions architecturales

**Stockage Supabase en v2.**
Thomas : "les parfums se stockeront dans le même type d'objet ?" Oui — `Fragrance` reste identique. `fragranceService.ts` gère la traduction entre rows PostgreSQL et objets TypeScript. Champs tableaux (`families`, `seasons`, `tags`) → colonnes `text[]` ou `jsonb`. `pyramid` → colonne `jsonb`. Les composants ne voient rien.

**Import CSV/JSON v3 — adapter pattern.**
Thomas anticipe l'import depuis Fragrantica et autres. Approche : un adaptateur par source (`fragranticaAdapter.ts`, etc.) qui prend les données brutes et retourne `NewFragrance[]`. Les vocabulaires fermés (`OlfactoryFamily`, `Concentration`) sont normalisés via des tables de correspondance. Ce qui ne mappe pas → champ vide → parfum dirty. Le dirty state existant fait le reste.

### Apprentissages

- **La validation TypeScript ne bloque pas le JSON à l'exécution.** Des familles invalides (`"oriental"`, `"cuiré"`) dans le JSON de test passaient silencieusement — le flacon s'affichait juste en gris. La vérification de conformité des données externes est un problème de couche service, pas de compilation.
- **`families: OlfactoryFamily[]` est un tableau multi-valeurs.** "Chypré" traduit en 3 familles simultanément a confirmé que le modèle supporte naturellement les accords complexes sans nouveau champ.
- **Deux états distincts pour deux responsabilités.** Le dropdown de tri avait besoin de distinguer "quelle rangée est visuellement surlignée" (reset au mouseLeave) de "quel sous-menu est ouvert" (sticks to last hover). Un seul état faisait les deux et créait le bug diagonal.

### Prochaine session

- Issue #21 : mode curation — sélection manuelle vers ShelfPage

---

## Session 2026-06-03 — Issues #21 + #27 : curation, étagères, panneau my-shelfs

### Ce qui était prévu

- Issue #21 : mode curation — étagères, sélection courante
- Issue #27 : panneau my-shelfs dans l'Atelier

### Ce qui a été fait

**Issue #21 — Curation (`feat/curation`, mergée)**

Architecture finale après plusieurs itérations de réflexion UX :

- `Shelf { id, name, createdAt, fragranceIds[] }` dans le store, persisté
- `currentSelection: string[]` — sélection temporaire, séparée des étagères sauvegardées
- `addToSelection` / `removeFromSelection` / `saveSelection(name)` / `clearSelection`
- `saveSelection` : crée une Shelf depuis currentSelection, vide la sélection
- Badge Atelier = `selectionCount` (longueur de la sélection courante)
- BottleWall / GestureBar : "Ajouter à la sélection" / "Dans la sélection ✓"
- ShelfPage : carousel vertical snap-scroll avec loop infini (clone first/last)
  Boutons ↑↓ flottants, navigation synchronisée avec le panneau via `activeShelfId`
- Tri actif dans les slides : `sortedFragrances` comme référence d'ordre
- Filtres dans les slides : visibilité seulement, composition inchangée
  Indicateur "Filtre actif · X/Y parfums" dans chaque slide

**Issue #27 — Panneau my-shelfs (`feat/curation`, même branche)**

- Panneau "my-shelfs" dans l'Atelier, switch avec FilterPanel via section persistée en localStorage
- 4 onglets : SÉLECTION | ÉTAGÈRES | FILTRE | AUCUN
  SÉLECTION : liste des parfums courants avec × par item + Sauvegarder avec nom
  ÉTAGÈRES : étagères sauvegardées, cliquables vers le carousel, ⋮ Renommer/Supprimer
  FILTRE : ajoute les résultats filtrés à la sélection (ne modifie pas les étagères)
  AUCUN : désélectionne l'étagère active
- Onglet par défaut selon la route (/shelf → ÉTAGÈRES, sinon SÉLECTION)
- Section Atelier persistée en localStorage (survit à la navigation)

**Fixes transversaux**

- AppHeader z-index 100 : stacking context du header au-dessus de tout → dropdown tri fonctionnel
- FragrancePage : `navigate(-1)` partout — retour vers la vue précédente
- Logo my-shelf and AI → Link vers /
- "Vue étagères →" remplace "Voir dans l'étagère" dans la GestureBar

### Décisions prises

**`currentSelection` séparé des étagères.**
Après plusieurs itérations confuses (auto-création à l'ajout, `type: "daily"`, etc.), la bonne
séparation est : sélection temporaire (panier de travail) vs étagères nommées (permanentes).
L'utilisateur voit ce qu'il a mis dans sa sélection avant de la nommer et sauvegarder.

**`sortedFragrances` comme référence d'ordre dans les slides.**
Les parfums d'une étagère s'affichent dans l'ordre du tri actif en filtrant `sortedFragrances`
par les IDs de l'étagère. Les hors-filtre s'ajoutent à la fin, masqués si filtre actif.

**Synchronisation carousel ↔ panneau via `activeShelfId`.**
Un seul état partagé dans le store. `scrollend` met à jour `activeShelfId` quand l'utilisateur
scrolle manuellement. `setActiveShelf` déclenche un `scrollIntoView` dans le carousel.
Pas de boucle infinie : appeler `setActiveShelf` avec la même valeur est un no-op.

### Bugs rencontrés en session

**stacking context du header.**
`backdrop-filter` crée un stacking context sans z-index → le dropdown tri était recouvert
par les éléments suivants dans le DOM. Fix : `position: relative; z-index: 100` sur le header.

**scroll initial vers la mauvaise étagère.**
`clientHeight` pouvait être 0 au moment du `useLayoutEffect`. Fix : `ResizeObserver` qui
attend des dimensions non-nulles, puis `scrollIntoView({ behavior: 'instant' })`.

**`currentSelection` remplace un modèle progressivement incohérent.**
Trois itérations avant d'arriver au bon modèle. La leçon : s'arrêter et réfléchir au modèle
mental de l'utilisateur avant de coder, surtout pour une feature aussi centrale.

### Prochaine session

- À définir selon les priorités

---

## Session 2026-06-03 (suite) — Issue #19 : démarrage passe UI (Atelier + FilterPanel)

### Ce qui était prévu

- Issue #19 : passe UI globale (shadcn)

### Ce qui a été fait

Premier pas de la passe UI sur le composant Atelier/FilterPanel comme test.
Branche `setup/shadcn-ui` ouverte, non mergée — réflexion en cours sur le plan de travail.

**Analyse delta design vs état actuel**

Comparaison de `vue-filterAtelier-2.png` avec l'état réel de l'app.
Delta identifié : chips trop petites/invisibles (border blanc sur fond blanc),
ichones nav en texte abrégé ("É", "♡"), chevrons ∧/∨ à remplacer,
container FilterPanel trop enveloppé, inputs peu contrasés.

**Passe #1 — Chips + lucide-react**

- `--border-chip: rgba(29,27,25,0.12)` ajouté dans index.css — border visible sur fond clair
- Chips familles/saisons/concentrations : `py-1`, dot 8px, `surface-primary` inactif
- `lucide-react` installé
- Nav Atelier : `BookMarked`, `Heart`, `BarChart2`, `Settings` remplacent "É/♡/S/R"

**Passe #2 — FilterPanel + Atelier nav polish**

- `ChevronUp`/`ChevronDown` (lucide 13px) remplacent ∧/∨
- Séparateurs fins `rgba(29,27,25,0.06)` entre sections
- Headers sections : 10px uppercase tracking large
- Label "Filter Atelier" : 9px ghost très discret
- Inputs : `border-chip`, `surface-primary`
- Container FilterPanel : plus de carte interne (respire directement dans le panel)
- Icône `Sparkles` (IA) dans NAV_ITEMS
- Items non-implémentés (IA, Favoris, Stats, Réglages) à 45% opacity
- AtelierClosed : helper `NavIcon` avec état actif amber
- Icônes `Home` + `Filter` (funnel) remplacent le `»` chevron

### Décisions prises

**Approche composant par composant.**
Plutôt qu'une migration shadcn globale, on avance section par section
en comparant avec les fichiers de design dans `assets/design/`.
L'Atelier/FilterPanel sert de prototype pour valider le pattern de style.

**shadcn Installé mais pas encore utilisé pour les composants.**
Lucide-react installé (icônes). shadcn/ui lui-même n'est pas encore installé —
la passe actuelle montre qu'on peut aller loin avec Tailwind + CSS variables
sans dépendances supplémentaires. Switch toggles = candidat naturel pour shadcn.

### Prochaine session

- Établir un plan de travail précis avec issues détaillées pour la passe UI
- Suite issue #19 : toggles (shadcn Switch ?), header app, vue collection (→ issue #28 en 2026-06-04)

---

## Session 2026-06-03 — Issue #17 recherche textuelle

### Ce qui était prévu

- Issue #17 : barre de recherche textuelle

### Ce qui a été fait

**Issue #17 — Recherche textuelle (`feat/search`, mergée)**

- `applySearch()` dans le store : filtre sur `name` et `brand`, insensible à la casse, query vide = pass-through
- `searchQuery: string` ajouté à l’interface du store, non persisté (absent de `partialize`)
- Pipeline complet : `applyFilters → applySearch → applySort → sortedFragrances`
- `setSearchQuery` : recalcule `sortedFragrances` à chaque frappe sans toucher `filteredFragrances`
- `onRehydrateStorage` : `searchQuery` forcé à `""` au redémarrage
- `AppHeader` : input remplace le placeholder statique, bouton × avec restauration du focus, placeholder coloré via `placeholder:text-(--text-muted)` (syntaxe Tailwind v4)

### Décisions prises

**Recherche non persistée.**
Thomas : « c’est un outil de recherche rapide comme tous les outils du header ». Cohérent avec le modèle mental : les filtres (familles, saisons…) sont des états durables, la recherche est contextuelle et jetable. Implémenté en excluant `searchQuery` de `partialize`.

**`filteredFragrances` reste le résultat des filtres seuls.**
La recherche textuelle s’intercale entre `filteredFragrances` et `applySort`. `filteredFragrances` conserve sa sémantique (filtres panneau uniquement) — utile si on veut afficher un compteur « X résultats pour ces filtres » séparément de la recherche.

### Prochaine session

- Issue #21 : mode curation — sélection manuelle vers ShelfPage

---

## Session 2026-06-03 — Issues #21 + #27 : curation, étagères, panneau my-shelfs

### Ce qui était prévu

- Issue #21 : mode curation — étagères, sélection courante
- Issue #27 : panneau my-shelfs dans l'Atelier

### Ce qui a été fait

**Issue #21 — Curation (`feat/curation`, mergée)**

Architecture finale après plusieurs itérations de réflexion UX :

- `Shelf { id, name, createdAt, fragranceIds[] }` dans le store, persisté
- `currentSelection: string[]` — sélection temporaire, séparée des étagères sauvegardées
- `addToSelection` / `removeFromSelection` / `saveSelection(name)` / `clearSelection`
- `saveSelection` : crée une Shelf depuis currentSelection, vide la sélection
- Badge Atelier = `selectionCount` (longueur de la sélection courante)
- BottleWall / GestureBar : "Ajouter à la sélection" / "Dans la sélection ✓"
- ShelfPage : carousel vertical snap-scroll avec loop infini (clone first/last)
  Boutons ↑↓ flottants, navigation synchronisée avec le panneau via `activeShelfId`
- Tri actif dans les slides : `sortedFragrances` comme référence d'ordre
- Filtres dans les slides : visibilité seulement, composition inchangée
  Indicateur "Filtre actif · X/Y parfums" dans chaque slide

**Issue #27 — Panneau my-shelfs (`feat/curation`, même branche)**

- Panneau "my-shelfs" dans l'Atelier, switch avec FilterPanel via section persistée en localStorage
- 4 onglets : SÉLECTION | ÉTAGÈRES | FILTRE | AUCUN
  SÉLECTION : liste des parfums courants avec × par item + Sauvegarder avec nom
  ÉTAGÈRES : étagères sauvegardées, cliquables vers le carousel, ⋮ Renommer/Supprimer
  FILTRE : ajoute les résultats filtrés à la sélection (ne modifie pas les étagères)
  AUCUN : désélectionne l'étagère active
- Onglet par défaut selon la route (/shelf → ÉTAGÈRES, sinon SÉLECTION)
- Section Atelier persistée en localStorage (survit à la navigation)

**Fixes transversaux**

- AppHeader z-index 100 : stacking context du header au-dessus de tout → dropdown tri fonctionnel
- FragrancePage : `navigate(-1)` partout — retour vers la vue précédente
- Logo my-shelf and AI → Link vers /
- "Vue étagères →" remplace "Voir dans l'étagère" dans la GestureBar

### Décisions prises

**`currentSelection` séparé des étagères.**
Après plusieurs itérations confuses (auto-création à l'ajout, `type: "daily"`, etc.), la bonne
séparation est : sélection temporaire (panier de travail) vs étagères nommées (permanentes).
L'utilisateur voit ce qu'il a mis dans sa sélection avant de la nommer et sauvegarder.

**`sortedFragrances` comme référence d'ordre dans les slides.**
Les parfums d'une étagère s'affichent dans l'ordre du tri actif en filtrant `sortedFragrances`
par les IDs de l'étagère. Les hors-filtre s'ajoutent à la fin, masqués si filtre actif.

**Synchronisation carousel ↔ panneau via `activeShelfId`.**
Un seul état partagé dans le store. `scrollend` met à jour `activeShelfId` quand l'utilisateur
scrolle manuellement. `setActiveShelf` déclenche un `scrollIntoView` dans le carousel.
Pas de boucle infinie : appeler `setActiveShelf` avec la même valeur est un no-op.

### Bugs rencontrés en session

**stacking context du header.**
`backdrop-filter` crée un stacking context sans z-index → le dropdown tri était recouvert
par les éléments suivants dans le DOM. Fix : `position: relative; z-index: 100` sur le header.

**scroll initial vers la mauvaise étagère.**
`clientHeight` pouvait être 0 au moment du `useLayoutEffect`. Fix : `ResizeObserver` qui
attend des dimensions non-nulles, puis `scrollIntoView({ behavior: 'instant' })`.

**`currentSelection` remplace un modèle progressivement incohérent.**
Trois itérations avant d'arriver au bon modèle. La leçon : s'arrêter et réfléchir au modèle
mental de l'utilisateur avant de coder, surtout pour une feature aussi centrale.

### Prochaine session

- À définir selon les priorités

---

## Session 2026-06-03 (suite) — Issue #19 : démarrage passe UI (Atelier + FilterPanel)

### Ce qui était prévu

- Issue #19 : passe UI globale (shadcn)

### Ce qui a été fait

Premier pas de la passe UI sur le composant Atelier/FilterPanel comme test.
Branche `setup/shadcn-ui` ouverte, non mergée — réflexion en cours sur le plan de travail.

**Analyse delta design vs état actuel**

Comparaison de `vue-filterAtelier-2.png` avec l'état réel de l'app.
Delta identifié : chips trop petites/invisibles (border blanc sur fond blanc),
ichones nav en texte abrégé ("É", "♡"), chevrons ∧/∨ à remplacer,
container FilterPanel trop enveloppé, inputs peu contrasés.

**Passe #1 — Chips + lucide-react**

- `--border-chip: rgba(29,27,25,0.12)` ajouté dans index.css — border visible sur fond clair
- Chips familles/saisons/concentrations : `py-1`, dot 8px, `surface-primary` inactif
- `lucide-react` installé
- Nav Atelier : `BookMarked`, `Heart`, `BarChart2`, `Settings` remplacent "É/♡/S/R"

**Passe #2 — FilterPanel + Atelier nav polish**

- `ChevronUp`/`ChevronDown` (lucide 13px) remplacent ∧/∨
- Séparateurs fins `rgba(29,27,25,0.06)` entre sections
- Headers sections : 10px uppercase tracking large
- Label "Filter Atelier" : 9px ghost très discret
- Inputs : `border-chip`, `surface-primary`
- Container FilterPanel : plus de carte interne (respire directement dans le panel)
- Icône `Sparkles` (IA) dans NAV_ITEMS
- Items non-implémentés (IA, Favoris, Stats, Réglages) à 45% opacity
- AtelierClosed : helper `NavIcon` avec état actif amber
- Icônes `Home` + `Filter` (funnel) remplacent le `»` chevron

### Décisions prises

**Approche composant par composant.**
Plutôt qu'une migration shadcn globale, on avance section par section
en comparant avec les fichiers de design dans `assets/design/`.
L'Atelier/FilterPanel sert de prototype pour valider le pattern de style.

**shadcn Installé mais pas encore utilisé pour les composants.**
Lucide-react installé (icônes). shadcn/ui lui-même n'est pas encore installé —
la passe actuelle montre qu'on peut aller loin avec Tailwind + CSS variables
sans dépendances supplémentaires. Switch toggles = candidat naturel pour shadcn.

### Prochaine session

- Établir un plan de travail précis avec issues détaillées pour la passe UI
- Suite issue #19 : toggles (shadcn Switch ?), header app, vue collection

---

## Session 2026-06-04 — Issue #28 : bibliothèque de composants UI (en cours)

### Ce qui était prévu

- Issue #28 : composants UI réutilisables — Chip, Tag, Toggle, Badge, Button, Input + shadcn

### Ce qui a été fait

**Roadmap clarifiée**

PRODUCT.md mis à jour avec issues #28–#35 détaillées. L'ancienne "issue #19 passe UI"
est désormais découpée en 8 issues distinctes. Branche : `setup/shadcn-ui`.

**shadcn/ui — installation manuelle (SSL réseau)**

`npx shadcn@latest init` échoue en raison d'un certificat SSL intercepté par le réseau.
Solution : installation manuelle — `clsx` + `tailwind-merge` installés via npm,
`components.json` et `src/lib/utils.ts` (fonction `cn()`) créés à la main.
Alias `@/*` ajouté dans `tsconfig.app.json` et `vite.config.ts`.

**`Chip.tsx` — composant pill réutilisable**

3 modes selon les props :
- **Horizontal** (défaut) : icône slot 14px fixe (grid) + texte `1fr` — alignement parfait, pas de bold shift
- **Circle** : `icon` sans `children` → cercle centré, `iconPadding` configurable
- **Vertical** : `layout="vertical"` → icône au-dessus, label en dessous (`rounded-xl`)

État actif : bg pastel `${color}1a` (~10% opacité), border colorée, icône colorée.
Texte toujours `--text-secondary`. Drop shadow discret. `transition-all duration-150`.

**`Tag.tsx` — tag supprimable**

Pill neutre : `--surface-primary`, `--border-chip`, `X` lucide 10px.
`translate-y-0.5` sur l icône × pour corriger l illusion optique viewBox lucide.
Utilisé dans `TagsInput` et `AutocompleteChipInput` (FilterPanel).

**`ConcentrationBottle.tsx` — SVG bouteille par concentration**

Même géométrie que `FragranceBottle`. Couleur ambrée fixe `#f0c373`.
Opacité liquide croissante : cologne 12% → extrait 92%.
Utilisé dans les chips concentrations (mode vertical, `grid-cols-5`).

**`MapleLeafIcon.tsx` — icône automne**

Icône `tabler-leaf-2` récupérée via shadcn.io/icons (Tabler Icons, MIT).
Style line cohérent avec lucide (stroke, viewBox 24x24, strokeWidth 2).

**`LeatherIcon.tsx` — icône cuiré**

SVG inline custom (2 rectangles arrondis empilés).
Nécessaire car pas d équivalent cuir/leather dans lucide-react.

**`families.ts` — config centralisée familles olfactives**

`FAMILY_CONFIG: Record<OlfactoryFamily, { color: string, Icon: ElementType }>`.
Icônes lucide + LeatherIcon. Fichier `.ts` pur (pas de JSX) pour Fast Refresh.
Couleurs révisées par Thomas (plus vives que les CSS variables d origine).

**FilterPanel — 3 sections refactorisées**

- Familles : `grid-cols-2`, icônes depuis `FAMILY_CONFIG`, `Chip` horizontal
- Saisons : 4 `Chip` cercle + `iconPadding="1rem"`, icônes lucide + MapleLeafIcon
- Concentrations : `grid-cols-5`, `Chip` vertical, `ConcentrationBottle size={0.6}`

**TagsInput — migré vers `Tag`**

Inline `<span>` remplacé par `<Tag onRemove>`.

### Décisions prises

**`families.tsx` → `families.ts` + `LeatherIcon.tsx` séparé.**
Un fichier `.tsx` qui exporte à la fois un composant et des données non-composants
casse Fast Refresh (`react-refresh/only-export-components`).
Solution : stocker la référence du composant (`Icon: ElementType`) plutôt qu une
fonction JSX — le JSX est rendu au call site. Fichier de config = `.ts` pur.

**Grid interne `12px 1fr` dans Chip (mode horizontal).**
`justify-center` causait un effet escalier. Avec un slot fixe de 12px pour l icône,
toutes les icônes sont à la même position X quelle que soit leur largeur intrinsèque.
Bonus : bold shift (fontWeight 400→500) ne décale plus rien — texte dans colonne `1fr` fixe.

**`NavIcon` sorti du render de `AtelierClosed`.**
ESLint `react-hooks/static-components` — créer un composant dans le corps d un autre
reset son état à chaque render. `NavIcon` déplacé au niveau module.

**shadcn installé manuellement.**
Le CLI shadcn fait des requêtes HTTPS vers `ui.shadcn.com` bloquées par le proxy SSL.
Pour ajouter des composants plus tard : `npm config set strict-ssl false` avant
`npx shadcn@latest add <composant>`, puis remettre `strict-ssl true`.

### Bugs / blocages rencontrés

**`Pepper` absent de lucide-react v1.17.**
Remplacé par `Flame` pour épicé, `FlameKindling` pour résineux.

**`baseUrl` déprécié en TypeScript 6.0.**
Fix : supprimer `baseUrl` de `tsconfig.app.json` — `paths` fonctionne seul depuis TS 6.0.

### Prochaine session

- Continuer issue #28 : `Toggle` (switch Favoris/Jamais portés/Échantillons)
- Puis `Button` et `Input` canoniques
- Puis issue #29 : typographie + palette couleurs définitives
