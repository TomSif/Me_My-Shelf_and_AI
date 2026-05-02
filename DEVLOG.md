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

_Créé le 2026-04-30_
