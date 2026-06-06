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
  hespéridé: { color: "#E8960A", Icon: Citrus },
  floral:     { color: "#C04880", Icon: Flower2 },
  herbacé:    { color: "#3A9E55", Icon: Leaf },
  résineux:   { color: "#8B2500", Icon: FlameKindling },
  boisé:      { color: "#7A4820", Icon: TreePine },
  épicé:      { color: "#CC3A18", Icon: Flame },
  musqué:     { color: "#3A85C0", Icon: Droplet },
  cuiré:      { color: "#5C3010", Icon: LeatherIcon },
  gourmand:   { color: "#C87030", Icon: Candy },
  alcoolisé:  { color: "#A05828", Icon: Martini },
  minéral:    { color: "#607A90", Icon: Stone },
  artificiel: { color: "#4A5CC8", Icon: FlaskConical },
  indéfini:   { color: "#909090", Icon: HelpCircle },
};
