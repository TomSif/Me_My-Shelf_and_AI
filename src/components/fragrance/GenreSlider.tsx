import type { GenreOlfactif } from "../../types/fragrance";

interface Props {
  value?: GenreOlfactif;
  onChange: (value: GenreOlfactif) => void;
}

export function GenreSlider({ value = 0, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type="range"
        min={-3}
        max={3}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as GenreOlfactif)}
        className="w-full accent-[var(--icon-active)]"
      />
      <div className="flex justify-between text-xs" style={{ color: "var(--text-muted)" }}>
        <span>Très féminin</span>
        <span>Unisexe</span>
        <span>Très masculin</span>
      </div>
    </div>
  );
}