import type { Concentration } from "../../types/fragrance";

const OPTIONS: { value: Concentration; label: string }[] = [
  { value: "cologne",        label: "Cologne" },
  { value: "eau de toilette", label: "EdT" },
  { value: "eau de parfum",  label: "EdP" },
  { value: "parfum",         label: "Parfum" },
  { value: "extrait",        label: "Extrait" },
];

interface Props {
  value?: Concentration;
  onChange: (value: Concentration) => void;
}

export function ConcentrationPicker({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all"
            style={{
              backgroundColor: active ? "var(--icon-active)" : "var(--surface-secondary)",
              color: active ? "#fff" : "var(--text-secondary)",
              border: `1px solid ${active ? "var(--icon-active)" : "var(--border-light)"}`,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}