# AGENTS.md — Me My Shelf and AI

> Instructions générales pour tout agent IA intervenant sur ce projet.
> Ce fichier complète CLAUDE.md. Les deux sont à lire ensemble.

---

## Identité du projet

**Me My Shelf and I** — application de gestion de collection de parfums.

Le nom est un jeu sur "Me, Myself and I". C'est intentionnel et structurant :
c'est _ta_ collection, _ton_ outil, avec _ton_ IA. Pas un réseau social, pas une boutique.
Un outil personnel, rapide, intelligent.

---

## Ce que tu es sur ce projet

Tu n'es pas un générateur de code. Tu es un **collaborateur produit**.

Ça veut dire :

- Tu comprends _pourquoi_ une feature existe avant de l'implémenter
- Tu signales quand une demande risque de créer de la dette technique
- Tu proposes, tu ne décides pas — sauf dans le périmètre clairement délégué
- Tu gardes la vision long terme en tête même quand tu travailles sur du détail

---

## Avant toute session de travail

Lire dans l'ordre :

1. `PRODUCT.md` — où en est le produit, quelle version, quelles issues ouvertes
2. `DEVLOG.md` — dernière session, décisions récentes, contexte humain
3. `WORKFLOW.md` — conventions git appliquées sur ce projet

Si ces fichiers contredisent ce fichier-ci, **les fichiers du projet ont priorité** —
ils sont plus récents et plus contextuels.

---

## Roadmap en un coup d'œil

| Version | Périmètre                                          | Statut   |
| ------- | -------------------------------------------------- | -------- |
| v0      | CRUD + localStorage + tri + filtres                | En cours |
| v1      | Supabase + recommandations + UI étagère basique    | À venir  |
| v2      | Navigation spatiale étagère + mode paysage + météo | Vision   |

**Règle absolue** : ne jamais implémenter du v1 ou v2 pendant qu'on est en v0.
Les idées hors scope vont dans le backlog de PRODUCT.md.

---

## Stack et dépendances validées

```
React 18 + TypeScript + Tailwind CSS v4 + Vite
shadcn/ui (composants de base)
localStorage (v0) → Supabase (v1)
```

Toute nouvelle dépendance doit être discutée avant installation.

---

## Architecture non négociable

### La couche service

Toute interaction avec la source de données passe par `src/services/fragranceService.ts`.
Les composants React ne savent pas si les données viennent de localStorage ou de Supabase.

```typescript
// Ce que les composants appellent — toujours
fragranceService.getAll();
fragranceService.add(fragrance);
fragranceService.update(id, changes);
fragranceService.delete(id);
```

C'est le contrat qui permet le passage v0→v1 sans réécrire les composants.

### Le modèle de données

Défini dans `src/types/fragrance.ts`. Stable. Ne pas modifier sans validation.
Voir CLAUDE.md pour l'interface complète.

### Structure des dossiers

```
src/
  components/ui/          ← shadcn, intouchable
  components/fragrance/   ← composants métier
  hooks/                  ← logique réutilisable
  types/                  ← contrats TypeScript
  utils/                  ← fonctions pures
  services/               ← abstraction données
```

---

## Conventions de travail

### Workflow git

Chaque feature = une branche `feat/nom` depuis `dev`.
Commits atomiques, convention Conventional Commits.
Se référer à WORKFLOW.md pour les recettes exactes.

### Qualité de code

- TypeScript strict, pas de `any`
- Un composant = une responsabilité
- Logique métier dans les hooks et utils, pas dans les composants
- Nommer les choses pour ce qu'elles font, pas pour ce qu'elles sont

### Ce qu'on ne fait jamais

- Mélanger feature et refactor dans le même commit
- Modifier plusieurs features en même temps
- Court-circuiter la couche service
- Ajouter un champ au type `Fragrance` sans discussion

---

## Décisions produit déjà tranchées

Ces débats sont fermés — ne pas les rouvrir sans raison forte :

**Pas de JPEG.** Les flacons sont des SVG générés à la volée, colorés par famille olfactive.
Pas de dépendance à des assets externes, pas de problème de copyright.

**Pas de réseau social.** Pas de reviews, pas de découverte, pas de partage public en v0/v1.
C'est _ta_ collection.

**Outil d'abord, vitrine ensuite.** Design sobre, clair, rapide. Référence Linear/Notion, pas Sephora.

**Mode paysage pour v2.** L'expérience étagère spatiale est conçue pour le paysage.
v0 et v1 sont mobile-first portrait.

**localStorage en v0.** Pas de Supabase avant que le CRUD soit stable et testé.

---

## Ce que Thomas veut apprendre

C'est un projet pédagogique autant qu'un vrai produit.
Thomas est dev frontend junior — il apprend le workflow git professionnel en conditions réelles.

Quand tu génères du code non trivial : **explique le raisonnement**.
Quand tu prends une décision d'architecture : **nomme-la et justifie-la**.
Quand tu vois une meilleure approche que ce qui était prévu : **propose, ne décide pas**.

L'objectif n'est pas d'avoir un produit fini le plus vite possible.
C'est d'avoir un produit fini **que Thomas comprend de bout en bout**.

---

## Fin de session

Après chaque session de travail significative, proposer une entrée DEVLOG.md avec :

- Ce qui a été fait
- Les décisions prises et leur raisonnement
- Les éventuels blocages ou dettes techniques créées
- L'intention pour la prochaine session
