import type { Fragrance, OlfactoryFamily } from "../types/fragrance";

const FAMILY_COLOR_VARS: Record<OlfactoryFamily, string> = {
  hespéridé: "var(--family-hesperide)",
  floral: "var(--family-floral)",
  herbacé: "var(--family-herbace)",
  épicé: "var(--family-epice)",
  gourmand: "var(--family-gourmand)",
  boisé: "var(--family-boise)",
  résineux: "var(--family-resineux)",
  musqué: "var(--family-musque)",
  cuiré: "var(--family-cuire)",
  alcoolisé: "var(--family-alcoolise)",
  minéral: "var(--family-mineral)",
  artificiel: "var(--family-artificiel)",
  indéfini: "var(--family-indefini)",
};

export interface SectionCompletion {
  identity: boolean;
  physical: boolean;
  olfactive: boolean;
  memory: boolean;
}

export function getSectionCompletion(fragrance: Fragrance): SectionCompletion {
  return {
    identity: fragrance.name.trim().length > 0 && fragrance.brand.trim().length > 0,
    physical: fragrance.concentration !== undefined && fragrance.volumeMl > 0,
    olfactive: fragrance.families.length > 0,
    memory: fragrance.rating !== undefined,
  };
}

export function isComplete(fragrance: Fragrance): boolean {
  return (
    fragrance.name.trim().length > 0 &&
    fragrance.brand.trim().length > 0 &&
    fragrance.families.length > 0 &&
    fragrance.concentration !== undefined &&
    fragrance.volumeMl > 0
  );
}

export function formatLastUsed(lastUsed?: string): string | null {
  if (!lastUsed) return null;
  const date = new Date(lastUsed);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Porté aujourd'hui";
  if (diffDays === 1) return "Porté hier";
  if (diffDays < 30) return `Porté il y a ${diffDays} jours`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Porté il y a ${months} mois`;
  }
  const years = Math.floor(diffDays / 365);
  return `Porté il y a ${years} an${years > 1 ? "s" : ""}`;
}

export function getLiquidColor(families: OlfactoryFamily[]): string {
  return families.length > 0
    ? (FAMILY_COLOR_VARS[families[0]] ?? "var(--family-indefini)")
    : "var(--family-indefini)";
}