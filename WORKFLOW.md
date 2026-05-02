# WORKFLOW.md — Guide Git Personnel

> Mon carnet de recettes git, construit session par session.
> Pas un cours — des procédures concrètes que j'applique sur ce projet.
> Chaque recette est ajoutée quand j'en ai besoin pour la première fois.

---

## Concepts de base — le modèle de branches

```
main          ← code stable, ce qui "tourne" (ne jamais coder directement ici)
  └── dev     ← intégration (les features finies arrivent ici avant main)
        └── feat/add-fragrance     ← une feature = une branche
        └── feat/list-fragrances
        └── fix/card-display-bug
        └── setup/init
```

**Règle** : on ne code jamais directement sur `main` ni sur `dev`.
Chaque modification passe par une branche dédiée.

---

## Recettes

### 1. Démarrer un nouveau projet

```bash
# 1. Créer le repo sur GitHub (interface web), cocher "Add README"
# 2. Cloner en local
git clone https://github.com/ton-username/fragrances-companion.git
cd fragrances-companion

# 3. Créer la branche dev
git checkout -b dev
git push -u origin dev

# 4. Vérifier qu'on est sur dev
git branch
```

---

### 2. Démarrer une nouvelle feature

```bash
# Toujours partir de dev à jour
git checkout dev
git pull origin dev

# Créer la branche feature (nommage : feat/nom-de-la-feature)
git checkout -b feat/add-fragrance

# Vérifier
git branch
# → * feat/add-fragrance
```

**Convention de nommage des branches :**
| Préfixe | Quand l'utiliser |
| ------- | ---------------- |
| `feat/` | nouvelle fonctionnalité |
| `fix/` | correction de bug |
| `setup/` | configuration, installation |
| `refactor/` | restructuration sans changement de comportement |
| `docs/` | documentation uniquement |

---

### 3. Commiter proprement (commits atomiques)

**Principe** : un commit = une intention. Pas "j'ai codé des trucs", mais "j'ai ajouté le formulaire".

```bash
# Voir ce qui a changé
git status
git diff

# Ajouter les fichiers concernés par CE commit (pas tout d'un coup)
git add src/components/AddFragranceForm.tsx

# Écrire le message AVANT de coder la prochaine chose
git commit -m "feat: ajouter le formulaire d'ajout de parfum"
```

**Convention des messages de commit (Conventional Commits) :**
| Préfixe | Quand l'utiliser |
| ------- | ---------------- |
| `feat:` | nouvelle fonctionnalité |
| `fix:` | correction de bug |
| `setup:` | installation, configuration |
| `refactor:` | restructuration |
| `style:` | CSS / mise en forme uniquement |
| `docs:` | README, commentaires |
| `chore:` | maintenance (dépendances, etc.) |

**Exemples de bons messages :**
```
feat: ajouter le formulaire d'ajout de parfum
feat: afficher la liste des parfums avec FragranceCard
fix: corriger l'affichage vide quand la liste est vide
refactor: extraire la logique localStorage dans useFragrances
docs: mettre à jour le README avec les instructions de lancement
```

**Règle d'or** : si le message contient "et", c'est probablement deux commits.

---

### 4. Terminer une feature et la merger dans dev

```bash
# S'assurer que tout est commité sur la branche feature
git status
# → nothing to commit

# Retourner sur dev et le mettre à jour
git checkout dev
git pull origin dev

# Merger la feature
git merge feat/add-fragrance

# Pousser dev sur GitHub
git push origin dev

# (Optionnel mais propre) Supprimer la branche locale
git branch -d feat/add-fragrance
```

---

### 5. Créer une Pull Request sur GitHub (interface web)

> Une PR, même en solo, c'est la trace lisible de "voilà ce que j'ai fait et pourquoi".

1. Aller sur GitHub → onglet **Pull Requests** → **New Pull Request**
2. Base : `dev` ← Compare : `feat/add-fragrance`
3. Titre : reprendre le titre de l'issue (`feat: ajouter le formulaire d'ajout de parfum`)
4. Description : `Closes #3` (lie la PR à l'issue, la ferme automatiquement au merge)
5. **Merge Pull Request** → **Squash and merge** (optionnel, garde l'historique propre)

---

### 6. Workflow complet — du début à la fin d'une feature

```
1. Lire l'issue sur GitHub
2. git checkout dev && git pull origin dev
3. git checkout -b feat/nom-feature
4. Coder — commiter atomiquement au fur et à mesure
5. git push origin feat/nom-feature
6. Créer la PR sur GitHub (base: dev)
7. Merger la PR
8. git checkout dev && git pull origin dev
9. Recommencer avec la prochaine issue
```

---

## Erreurs fréquentes et solutions

> À compléter au fur et à mesure des bugs rencontrés.

| Erreur | Cause | Solution |
| ------ | ----- | -------- |
| *(à venir)* | | |

---

## Glossaire

| Terme | Définition simple |
| ----- | ----------------- |
| **commit** | Une photo de l'état du code à un instant T, avec un message |
| **branche** | Une copie parallèle du code où on travaille sans toucher le reste |
| **merge** | Fusionner une branche dans une autre |
| **PR (Pull Request)** | Demande formelle de merger une branche — la trace visible du travail |
| **issue** | Ticket qui décrit une tâche à faire (feature, bug, etc.) |
| **origin** | Le repo distant sur GitHub |
| **HEAD** | Le commit où on est actuellement |
| **staging** | Zone intermédiaire entre les fichiers modifiés et le commit (`git add`) |

---

_Créé le 2026-04-30 — Sera complété à chaque session_
