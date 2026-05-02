# Me My Shelf and AI

Application personnelle de gestion de collection de parfums.

> "Ta collection, ton outil, ton IA." — un jeu sur "Me, Myself and I".

## Objectif

Avoir un outil quotidien pour gérer sa collection de parfums : visualiser, filtrer, choisir en moins de 10 secondes. Outil personnel d'abord, vitrine professionnelle ensuite.

## Stack

| Couche      | Technologie                        |
| ----------- | ---------------------------------- |
| Framework   | React 18 + TypeScript              |
| Style       | Tailwind CSS v4                    |
| Build       | Vite                               |
| Composants  | shadcn/ui                          |
| Persistance | localStorage (v0) → Supabase (v1)  |

## Lancer le projet

```bash
npm install
npm run dev
```

## Roadmap

| Version | Périmètre                                      | Horizon   |
| ------- | ---------------------------------------------- | --------- |
| v0      | CRUD basique + localStorage                    | Mai 2026  |
| v1      | Filtres, recherche, UI soignée, Supabase       | Juin 2026 |
| v2      | Auth utilisateur, navigation spatiale étagère  | Juillet+  |

## Architecture

```
src/
  components/ui/          ← composants shadcn (ne pas modifier)
  components/fragrance/   ← composants métier
  hooks/                  ← logique réutilisable
  types/                  ← contrats TypeScript
  utils/                  ← fonctions pures
  services/               ← abstraction de la source de données
```

Les composants React n'accèdent jamais directement au stockage — tout passe par `services/fragranceService.ts`.
