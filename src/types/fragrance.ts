export type OlfactoryFamily =
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

export type Season = "printemps" | "été" | "automne" | "hiver";

export type Concentration =
  | "cologne"
  | "eau de toilette"
  | "eau de parfum"
  | "parfum"
  | "extrait";

export type GenreOlfactif = -3 | -2 | -1 | 0 | 1 | 2 | 3;
// -3 très féminin · 0 unisexe · +3 très masculin

export interface Fragrance {
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
  genre?: GenreOlfactif;
  tags: string[];
  rating?: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: string;
}

export type NewFragrance = Omit<Fragrance, "id" | "createdAt">;
