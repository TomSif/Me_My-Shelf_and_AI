# CLAUDE.md — Me My Shelf and AI

> Ce fichier configure le comportement de Claude Code sur ce projet.
> Tu es un collaborateur produit autant qu'un assistant technique.
> Lis PRODUCT.md, DEVLOG.md et WORKFLOW.md avant toute intervention.

---

## Le projet

**Me My Shelf and I** est une application personnelle de gestion de collection de parfums.
Un outil quotidien — pas une vitrine. L'utilisateur doit pouvoir choisir un parfum en 10 secondes.

Vision long terme : une étagère interactive et spatiale où chaque étage est une catégorie,
navigable horizontalement, avec recommandations intelligentes basées sur l'humeur et la météo.

Vision court terme (v1) : navigation par pages, filtres, dirty state, drawer aperçu — logique métier complète avant la passe UI.

**Le nom vient de "Me, Myself and I" — c'est intentionnel.** Ta collection, ton outil, ton IA.

---

## Stack

```
React + TypeScript + Tailwind CSS v4 + Vite + shadcn/ui
v0 : localStorage                          ✅ terminée
v1 : React Router + logique métier complète + localStorage
v2 : Supabase + auth + étagère spatiale (mode paysage)
```

---

## Modèle de données central

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
  volumeMl: number;
  remainingMl: number;
  purchaseDate?: string;
  purchasePrice?: number;
  lastUsed?: string;
  families: OlfactoryFamily[];
  seasons: Season[];
  tags: string[];
  rating?: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: string;
}
```

Ce modèle est stable. Ne pas le modifier sans discussion avec Thomas.

---

## Fichiers de suivi — à lire en priorité

| Fichier       | Contenu                                                 |
| ------------- | ------------------------------------------------------- |
| `PRODUCT.md`  | Vision, roadmap, issues, backlog                        |
| `DEVLOG.md`   | Journal de sessions — décisions et raisonnements        |
| `WORKFLOW.md` | Guide git personnel — recettes appliquées sur ce projet |

Avant toute intervention significative : lire ces trois fichiers.
Après toute intervention significative : proposer une mise à jour du DEVLOG.md.

---

## Comment travailler sur ce projet

### Tu peux agir de façon autonome pour :

- Implémenter une feature dont l'issue GitHub est rédigée et le scope est clair
- Créer des composants React en respectant la structure définie
- Écrire des types TypeScript en cohérence avec le modèle central
- Installer des dépendances de la stack validée (shadcn, etc.)
- Corriger des bugs identifiés
- Améliorer la lisibilité du code sans changer le comportement

### Tu dois consulter Thomas avant de :

- Modifier le modèle de données `Fragrance`
- Changer la structure des dossiers
- Introduire une nouvelle dépendance hors stack validée
- Implémenter quelque chose qui n'a pas d'issue GitHub
- Prendre une décision d'architecture qui engage les versions suivantes

### Tu ne fais jamais :

- Implémenter plusieurs features en même temps
- Mélanger refactor et feature dans le même commit
- Créer des composants qui couplent la logique et l'affichage
- Sauter l'étape "réfléchir avant de coder"

---

## Structure des dossiers attendue

```
src/
  pages/         ← une page par route (ShelfPage, AddPage, FragranceDetailPage)
  components/
    ui/          ← composants shadcn (ne pas modifier)
    fragrance/   ← composants métier (FragranceCard, FragranceForm, etc.)
  hooks/         ← useFragrances, useLocalStorage, etc.
  types/         ← fragrance.ts et autres types
  utils/         ← fonctions pures (tri, filtres, recommandations)
  services/      ← fragranceService.ts (abstraction de la source de données)
```

---

## Principes de code

**Couche service obligatoire.**
Les composants React n'accèdent jamais directement à localStorage ou Supabase.
Ils passent toujours par `fragranceService.ts` — c'est ce qui permet le swap v0→v1 sans refactor.

**Commits atomiques.**
Un commit = une intention. Respecter les conventions du WORKFLOW.md.
Format : `type: description courte` (feat, fix, refactor, style, docs, chore)

**TypeScript strict.**
Pas de `any`. Les types viennent de `/types/fragrance.ts`.

**Composants isolés.**
Un composant = une responsabilité. Si ça fait deux choses, c'est deux composants.

---

## Design

Outil quotidien d'abord, vitrine ensuite.
Référence : Linear, Notion — pas Sephora.
Fond clair, sobre, aéré. Accents amber/or très discrets.
shadcn/ui comme base de composants.

Pas de JPEG pour les flacons. Les parfums sont représentés par des SVG générés
à la volée, colorés par famille olfactive.

---

## Workflow git — rappel

```
main ← stable
  └── dev ← intégration
        └── feat/nom-feature ← une feature = une branche
```

Chaque feature suit ce cycle :
issue GitHub → branche → commits atomiques → PR → merge dans dev

---

## Contexte Thomas

Développeur frontend junior. Stack React + TypeScript + Tailwind.
Apprend le workflow git professionnel en conditions réelles sur ce projet.
Objectif : un produit qu'il utilise au quotidien + une vitrine professionnelle.

Niveau d'autonomie souhaité : **élevé sur l'implémentation, collaboratif sur les décisions**.
Il préfère comprendre ce qu'il se passe plutôt que recevoir du code clé en main.
Si tu génères du code non trivial, explique le raisonnement.
