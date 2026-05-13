import type { OlfactoryFamily } from "../types/fragrance";

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

export function getLiquidColor(families: OlfactoryFamily[]): string {
  return families.length > 0
    ? (FAMILY_COLOR_VARS[families[0]] ?? "var(--family-indefini)")
    : "var(--family-indefini)";
}