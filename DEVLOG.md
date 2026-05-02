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

_Créé le 2026-04-30_
