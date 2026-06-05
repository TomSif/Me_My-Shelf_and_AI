import type { ElementType } from "react";
import {
  Citrus,
  Flower2,
  Leaf,
  Flame,
  FlameKindling,
  TreePine,
  Droplet,
  Candy,
  Martini,
  Stone,
  FlaskConical,
  HelpCircle,
} from "lucide-react";
import { LeatherIcon } from "../components/ui/LeatherIcon";
import type { OlfactoryFamily } from "../types/fragrance";

interface FamilyConfig {
  color: string;
  Icon: ElementType;
}

export const FAMILY_CONFIG: Record<OlfactoryFamily, FamilyConfig> = {
  hespéridé: { color: "#D6A24A", Icon: Citrus },
  floral: { color: "#C78FAF", Icon: Flower2 },
  herbacé: { color: "#8DAA7B", Icon: Leaf },
  résineux: { color: "#6E7D57", Icon: FlameKindling },
  boisé: { color: "#9A785B", Icon: TreePine },
  épicé: { color: "#B56D54", Icon: Flame },
  musqué: { color: "#8AA8C5", Icon: Droplet },
  cuiré: { color: "#7A594A", Icon: LeatherIcon },
  gourmand: { color: "#B59A7A", Icon: Candy },
  alcoolisé: { color: "#996633", Icon: Martini },
  minéral: { color: "#9B9B9B", Icon: Stone },
  artificiel: { color: "#8C93C8", Icon: FlaskConical },
  indéfini: { color: "#aaaaaa", Icon: HelpCircle },
};
