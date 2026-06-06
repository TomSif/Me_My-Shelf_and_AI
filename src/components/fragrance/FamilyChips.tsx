import type { OlfactoryFamily } from "../../types/fragrance";
import { Chip } from "../ui/Chip";
import { FAMILY_CONFIG } from "../../utils/families";

const FAMILIES: OlfactoryFamily[] = [
  "hespéridé",
  "floral",
  "herbacé",
  "épicé",
  "gourmand",
  "boisé",
  "résineux",
  "musqué",
  "cuiré",
  "alcoolisé",
  "minéral",
  "artificiel",
  "indéfini",
];

interface Props {
  value: OlfactoryFamily[];
  onChange: (value: OlfactoryFamily[]) => void;
}

export function FamilyChips({ value, onChange }: Props) {
  function toggle(family: OlfactoryFamily) {
    if (value.includes(family)) {
      onChange(value.filter((f) => f !== family));
    } else {
      onChange([...value, family]);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {FAMILIES.map((family) => {
        const { color, Icon } = FAMILY_CONFIG[family];
        return (
          <Chip
            key={family}
            active={value.includes(family)}
            color={color}
            icon={<Icon size={16} />}
            onClick={() => toggle(family)}
            className="w-full"
          >
            {family}
          </Chip>
        );
      })}
    </div>
  );
}
