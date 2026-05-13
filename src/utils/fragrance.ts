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
  alcoolisé: "var(--family-alcoolise)",
  minéral: "var(--family-mineral)",
  artificiel: "var(--family-artificiel)",
  indéfini: "var(--family-indefini)",
};

export function isComplete(fragrance: Fragrance): boolean {
  return (
    fragrance.name.trim().length > 0 &&
    fragrance.brand.trim().length > 0 &&
    fragrance.families.length > 0 &&
    fragrance.concentration !== undefined &&
    fragrance.volumeMl > 0
  );
}

export function getLiquidColor(families: OlfactoryFamily[]): string {
  return families.length > 0
    ? (FAMILY_COLOR_VARS[families[0]] ?? "var(--family-indefini)")
    : "var(--family-indefini)";
}