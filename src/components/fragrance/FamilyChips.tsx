import type { OlfactoryFamily } from "../../types/fragrance";

const FAMILIES: OlfactoryFamily[] = [
  "hespéridé", "floral", "herbacé", "épicé", "gourmand",
  "boisé", "résineux", "musqué", "alcoolisé", "minéral",
  "artificiel", "indéfini",
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
    <div className="flex gap-2 flex-wrap">
      {FAMILIES.map((family) => {
        const active = value.includes(family);
        return (
          <button
            key={family}
            type="button"
            onClick={() => toggle(family)}
            className="px-3 py-1 rounded-full text-xs capitalize transition-all"
            style={{
              backgroundColor: active ? "var(--surface-primary)" : "var(--surface-secondary)",
              color: active ? "var(--text-primary)" : "var(--text-muted)",
              border: `1px solid ${active ? "var(--border-soft)" : "var(--border-light)"}`,
              fontWeight: active ? 500 : 400,
            }}
          >
            {family}
          </button>
        );
      })}
    </div>
  );
}
